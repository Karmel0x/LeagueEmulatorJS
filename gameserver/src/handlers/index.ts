
import '@workspace/packets/packages/packets/register';
import * as handlers from './handlers';
import * as packets from '@workspace/packets/packages/packets';
import Player from '../gameobjects/units/player';
import { PacketModel } from '@workspace/network/packages/packets/packet';

export default {
	[packets.KeyCheck.id]: handlers.KeyCheck,
	[packets.TutorialAudioEventFinished.id]: handlers.TutorialAudioEventFinished,
	[packets.SynchSimTime.id]: handlers.SynchSimTime,
	[packets.RemoveItemReq.id]: handlers.RemoveItemReq,
	[packets.ResumePacket.id]: handlers.ResumePacket,
	[packets.QueryStatusReq.id]: handlers.QueryStatusReq,
	[packets.Ping_Load_Info.id]: handlers.Ping_Load_Info,
	[packets.WriteNavFlags_Acc.id]: handlers.WriteNavFlags_Acc,
	[packets.SwapItemReq.id]: handlers.SwapItemReq,
	[packets.World_SendCamera_Server.id]: handlers.World_SendCamera_Server,
	[packets.UpgradeSpellReq.id]: handlers.UpgradeSpellReq,
	[packets.UseObject.id]: handlers.UseObject,
	[packets.UpdateGameOptions.id]: handlers.UpdateGameOptions,
	[packets.PlayEmote.id]: handlers.PlayEmote,
	[packets.PlayVOCommand.id]: handlers.PlayVOCommand,
	[packets.OnScoreBoardOpened.id]: handlers.OnScoreBoardOpened,
	[packets.ClientReady.id]: handlers.ClientReady,
	[packets.StatsUpdateReq.id]: handlers.StatsUpdateReq,
	[packets.MapPing.id]: handlers.MapPing,
	[packets.OnShopOpened.id]: handlers.OnShopOpened,
	[packets.RequestJoinTeam.id]: handlers.RequestJoinTeam,
	[packets.Chat.id]: handlers.Chat,
	[packets.OnTipEvent.id]: handlers.OnTipEvent,
	[packets.IssueOrderReq.id]: handlers.IssueOrderReq,
	[packets.Waypoint_Acc.id]: handlers.Waypoint_Acc,
	[packets.World_LockCamera_Server.id]: handlers.World_LockCamera_Server,
	[packets.BuyItemReq.id]: handlers.BuyItemReq,
	[packets.ClientFinished.id]: handlers.ClientFinished,
	[packets.Exit.id]: handlers.Exit,
	[packets.World_SendGameNumber.id]: handlers.World_SendGameNumber,
	[packets.CastSpellReq.id]: handlers.CastSpellReq,
	[packets.SoftReconnect.id]: handlers.SoftReconnect,
	[packets.PausePacket.id]: handlers.PausePacket,
	[packets.TeamSurrenderVote.id]: handlers.TeamSurrenderVote,
	[packets.OnReplication_Acc.id]: handlers.OnReplication_Acc,
	[packets.SendSelectedObjId.id]: handlers.SendSelectedObjId,
	[packets.SynchVersionC2S.id]: handlers.SynchVersion,
	[packets.CharSelected.id]: handlers.CharSelected,
	[packets.OnTutorialPopupClosed.id]: handlers.OnTutorialPopupClosed,
	[packets.OnQuestEvent.id]: handlers.OnQuestEvent,
	[packets.OnRespawnPointEvent.id]: handlers.OnRespawnPointEvent,
	[packets.SpellChargeUpdateReq.id]: handlers.SpellChargeUpdateReq,
	[packets.SpectatorDataReq.id]: handlers.SpectatorDataReq,
	[packets.PlayContextualEmote.id]: handlers.PlayContextualEmote,
	[packets.TeamBalanceVote.id]: handlers.TeamBalanceVote,
	[packets.UnitSendDrawPath.id]: handlers.UnitSendDrawPath,
	[packets.UndoItemReq.id]: handlers.UndoItemReq,
	[packets.CheatLogGoldSources.id]: handlers.CheatLogGoldSources,
} as {
	[packetId: number]: (player: Player | number, packet: PacketModel) => void
};
