
function scaleFreedraw(scale) {
	freeDraw.zoomAndOffset(scale);
	//canvas.style.height = (canvas.height * scale) + 'px';
	//canvas.style.width = (canvas.width * scale) + 'px';
}
function scaleImage(scale) {
	image.style.height = (image.naturalHeight * scale) + 'px';
	image.style.width = (image.naturalWidth * scale) + 'px';
}
function resetScale() {
	scaleFreedraw(canvas.width < 500 ? 3 : (canvas.width < 2000 ? 1 : 0.1));
	scaleImage(freeDraw.zoomLevel);
}

function div_optionShow() {
	document.getElementById('div_options').style.display = document.getElementById('div_options').style.display == 'block' ? 'none' : 'block';
}
function div_infoShow() {
	document.getElementById('div_info').style.display = document.getElementById('div_info').style.display == 'block' ? 'none' : 'block';
}

function zoom_in() {
	if (freeDraw.zoomLevel >= 10)
		return;

	let scale = freeDraw.zoomLevel + (freeDraw.zoomLevel <= 1 ? 0.1 : 1);
	scaleFreedraw(scale);
	scaleImage(scale);
}
function zoom_out() {
	if (freeDraw.zoomLevel <= 0.11)
		return;

	let scale = freeDraw.zoomLevel - (freeDraw.zoomLevel <= 1 ? 0.1 : 1);
	scaleFreedraw(scale);
	scaleImage(scale);
}

function editShape(id) {
	finishEditing();
	freeDraw.shapeInCanvas[id]?.editShape();
	// allow to add new points on editing
	freeDraw.shapeInCanvas[id].isCreate = true;
	refreshShapeList();
}
function cancelEditShape() {
	freeDraw.shapeInCanvas[freeDraw.editingId]?.cancelEdit();
	finishEditing();
}
function finishEditing() {
	freeDraw.shapeInCanvas[freeDraw.editingId]?.finish();
	refreshShapeList();
}
function deleteShape(id) {
	freeDraw.removeShape(id);
	refreshShapeList();
}

function xyAsInt(value = null) {
	_xyAsInt = value ?? !_xyAsInt;
	refreshShapeList();
}
function shapesToJson() {
	//let json = Object.values(freeDraw.shapeInCanvas).map(shape => shape.points);
	//document.getElementById('shapeListJson').value = JSON.stringify(json);

	let shapePoints = Object.values(freeDraw.shapeInCanvas).map(shape => shape.points);
	if (_xyAsInt)
		shapePoints = shapePoints.map(shape => shape.map(point => point.map(xy => Math.round(xy))));
	let json = shapePoints.map(point => JSON.stringify(point));

	return "[\n" + json.join(",\n") + "\n]";
}

function refreshShapeList() {
	document.getElementById('shapeList').innerHTML = '';
	for (let id in freeDraw.shapeInCanvas) {
		let shape = freeDraw.shapeInCanvas[id];
		document.getElementById('shapeList').innerHTML +=
			`<div>${shape.id} `
			+ (!shape.edit ? `<button onclick="editShape('${id}')">edit</button>` : `<button onclick="cancelEditShape()">cancel</button>`)
			+ `<button onclick="deleteShape('${id}')">delete</button>`
			+ `</div>`;
	}

	document.getElementById('shapeListJson').value = shapesToJson();
}

function readShapeListJson() {
	let json = JSON.parse(document.getElementById('shapeListJson').value);
	json = json.filter(points => points.length > 0);
	//json.sort((a, b) => a[0][1] - b[0][1]);

	let shapes = json.map((points) => {
		freeDraw.shapeCounter = ++freeDraw.shapeCounter || 0;
		return {
			id: 'polygon-' + freeDraw.shapeCounter,
			type: 'polygon',
			points: points
		}
	});
	shapes.forEach(shape => freeDraw.addShape(shape).finish());
	refreshShapeList();
	document.getElementById('read_shape_json_list_button').style.display = 'none';
}

function newShape() {
	finishEditing();
	freeDraw.shapeCounter = ++freeDraw.shapeCounter || 0;
	let shape = freeDraw.addShape({ id: 'polygon-' + freeDraw.shapeCounter, type: 'polygon' });

	// add deleting point method on right mouse click
	if (!shape.__proto__.__polygonMouseDown) {
		shape.__proto__.__polygonMouseDown = shape.__proto__._polygonMouseDown;
		shape.__proto__._polygonMouseDown = function (event) {
			//if(event.button === 0){
			//  console.log(this);
			//}
			if (event.button === 1)
				return;
			if (event.button === 2) {
				if (this.clickedHandlePoint) {
					this.points.splice(this.clickedHandlePointIndex, 1);
					freeDraw._refreshShapesInCanvas();
				}
				return;
			}
			this.__polygonMouseDown(event);
		};
	}

	refreshShapeList();
	document.getElementById('read_shape_json_list_button').style.display = 'none';
}

function repToCp(scaling = 1) {
	let q = document.getElementById('shapeListJson').value;
	if (scaling != 1) {
		q = q.replace(/\d+/g, (match) => {
			return Math.round(parseInt(match) * scaling);
		});
	}
	q = q.replaceAll('[\n[', '[');
	q = q.replaceAll(']\n]', '],');
	q = q.replaceAll('[[', '{NavMesh::Polygon p;p.AddPoint(');
	q = q.replaceAll(']],', ');polygons.push_back(p);}');
	q = q.replaceAll('],[', ');p.AddPoint(');
	return q;
}
