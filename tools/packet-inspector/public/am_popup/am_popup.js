
class am_popup {
	constructor(element) {
		this.element = element;
		this.showel = null;
	}
	show(show = true) {
		this.showel = document.getElementById(this.element);
		this.showel.style.visibility = show ? 'visible' : 'hidden';
		if (this.showel.onclick == null)
			this.showel.onclick = () => this.hide();
	}
	hide() {
		if (window.event && window.event.target != document.getElementById(this.element))
			return;
		this.show(false);
		if (this.onhide != null)
			this.onhide();
	}
	addButton(element) {
		element = document.getElementById(element);
		if (element == null)
			return;

		element.href = `javascript:${this.element}.show()`;
	}

	static show(element) {
		if (typeof element === 'string')
			element = document.getElementById(element);

		if (element.am_popup == null)
			element.am_popup = new am_popup(element.id);
		element.am_popup.show();
	}
	static hide(element) {
		if (typeof element === 'string')
			element = document.getElementById(element);
		element.am_popup.show(false);
	}

}
