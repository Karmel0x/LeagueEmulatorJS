
import type Packet from '@repo/network/packets/packet';
import type { PacketModel } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import '@repo/packets/register';
import type Player from '../gameobjects/unit-ai/player';
import * as handlers from './handlers';

export function packetIdent(packet: typeof Packet) {
	return `${packet.channel}-${packet.id}`;
}

const list: {
	[packetId: string]: (player: Player | number, packet: PacketModel) => void
} = {};

export function registerHandlers() {
	const list2 = {
		[packetIdent(packets.KeyCheck)]: handlers.KeyCheck,
		[packetIdent(packets.TutorialAudioEventFinished)]: handlers.TutorialAudioEventFinished,
		[packetIdent(packets.SynchSimTime)]: handlers.SynchSimTime,
		[packetIdent(packets.RemoveItemReq)]: handlers.RemoveItemReq,
		[packetIdent(packets.ResumePacket)]: handlers.ResumePacket,
		[packetIdent(packets.QueryStatusReq)]: handlers.QueryStatusReq,
		[packetIdent(packets.Ping_Load_Info)]: handlers.Ping_Load_Info,
		[packetIdent(packets.WriteNavFlags_Acc)]: handlers.WriteNavFlags_Acc,
		[packetIdent(packets.SwapItemReq)]: handlers.SwapItemReq,
		[packetIdent(packets.World_SendCamera_Server)]: handlers.World_SendCamera_Server,
		[packetIdent(packets.UpgradeSpellReq)]: handlers.UpgradeSpellReq,
		[packetIdent(packets.UseObject)]: handlers.UseObject,
		[packetIdent(packets.UpdateGameOptions)]: handlers.UpdateGameOptions,
		[packetIdent(packets.PlayEmote)]: handlers.PlayEmote,
		[packetIdent(packets.PlayVOCommand)]: handlers.PlayVOCommand,
		[packetIdent(packets.OnScoreBoardOpened)]: handlers.OnScoreBoardOpened,
		[packetIdent(packets.ClientReady)]: handlers.ClientReady,
		[packetIdent(packets.StatsUpdateReq)]: handlers.StatsUpdateReq,
		[packetIdent(packets.MapPing)]: handlers.MapPing,
		[packetIdent(packets.OnShopOpened)]: handlers.OnShopOpened,
		[packetIdent(packets.RequestJoinTeam)]: handlers.RequestJoinTeam,
		[packetIdent(packets.Chat)]: handlers.Chat,
		[packetIdent(packets.OnTipEvent)]: handlers.OnTipEvent,
		[packetIdent(packets.IssueOrderReq)]: handlers.IssueOrderReq,
		[packetIdent(packets.Waypoint_Acc)]: handlers.Waypoint_Acc,
		[packetIdent(packets.World_LockCamera_Server)]: handlers.World_LockCamera_Server,
		[packetIdent(packets.BuyItemReq)]: handlers.BuyItemReq,
		[packetIdent(packets.ClientFinished)]: handlers.ClientFinished,
		[packetIdent(packets.Exit)]: handlers.Exit,
		[packetIdent(packets.World_SendGameNumber)]: handlers.World_SendGameNumber,
		[packetIdent(packets.CastSpellReq)]: handlers.CastSpellReq,
		[packetIdent(packets.SoftReconnect)]: handlers.SoftReconnect,
		[packetIdent(packets.PausePacket)]: handlers.PausePacket,
		[packetIdent(packets.TeamSurrenderVote)]: handlers.TeamSurrenderVote,
		[packetIdent(packets.OnReplication_Acc)]: handlers.OnReplication_Acc,
		[packetIdent(packets.SendSelectedObjId)]: handlers.SendSelectedObjId,
		[packetIdent(packets.SynchVersionC2S)]: handlers.SynchVersion,
		[packetIdent(packets.CharSelected)]: handlers.CharSelected,
		[packetIdent(packets.OnTutorialPopupClosed)]: handlers.OnTutorialPopupClosed,
		[packetIdent(packets.OnQuestEvent)]: handlers.OnQuestEvent,
		[packetIdent(packets.OnRespawnPointEvent)]: handlers.OnRespawnPointEvent,
		[packetIdent(packets.SpellChargeUpdateReq)]: handlers.SpellChargeUpdateReq,
		[packetIdent(packets.SpectatorDataReq)]: handlers.SpectatorDataReq,
		[packetIdent(packets.PlayContextualEmote)]: handlers.PlayContextualEmote,
		[packetIdent(packets.TeamBalanceVote)]: handlers.TeamBalanceVote,
		[packetIdent(packets.UnitSendDrawPath)]: handlers.UnitSendDrawPath,
		[packetIdent(packets.UndoItemReq)]: handlers.UndoItemReq,
		[packetIdent(packets.CheatLogGoldSources)]: handlers.CheatLogGoldSources,
	};

	for (const key in list2) {
		//@ts-ignore
		list[key] = list2[key];
	}
}

export default list;
