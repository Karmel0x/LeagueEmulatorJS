
import KEY_CHECK from './HANDSHAKE/0x00-KEY_CHECK.js';
import RequestJoinTeam from './LOADING_SCREEN/0x64-RequestJoinTeam.js';
import RequestReskin from './LOADING_SCREEN/0x65-RequestReskin.js';
import RequestRename from './LOADING_SCREEN/0x66-RequestRename.js';
import TeamRosterUpdate from './LOADING_SCREEN/0x67-TeamRosterUpdate.js';
import Chat from './COMMUNICATION/0x68-Chat.js';
import QuickChat from './COMMUNICATION/0x69-QuickChat.js';
import HierarchicalProfilerUpdate from './HANDSHAKE/0x01-HierarchicalProfilerUpdate.js';
import DisplayLocalizedTutorialChatText from './S2C/0x02-DisplayLocalizedTutorialChatText.js';
import Barrack_SpawnUnit from './S2C/0x03-Barrack_SpawnUnit.js';
import SwitchNexusesToOnIdleParticles from './S2C/0x04-SwitchNexusesToOnIdleParticles.js';
import TutorialAudioEventFinished from './C2S/0x05-TutorialAudioEventFinished.js';
import SetCircularMovementRestriction from './S2C/0x06-SetCircularMovementRestriction.js';
import UpdateGoldRedirectTarget from './S2C/0x07-UpdateGoldRedirectTarget.js';
import SynchSimTime from './GAMEPLAY/0x08-SynchSimTime.js';
import RemoveItemReq from './C2S/0x09-RemoveItemReq.js';
import ResumePacket from './C2S/0x0A-ResumePacket.js';
import RemoveItemAns from './S2C/0x0B-RemoveItemAns.js';
import Basic_Attack from './S2C/0x0C-Basic_Attack.js';
import ReplaceObjectiveText from './S2C/0x0D-ReplaceObjectiveText.js';
import CloseShop from './S2C/0x0E-CloseShop.js';
import Reconnect from './S2C/0x0F-Reconnect.js';
import UnitAddEXP from './S2C/0x10-UnitAddEXP.js';
import EndSpawn from './S2C/0x11-EndSpawn.js';
import SetFrequency from './S2C/0x12-SetFrequency.js';
import BotAI from './S2C/0x13-BotAI.js';
import QueryStatusReq from './C2S/0x14-QueryStatusReq.js';
import UpgradeSpellAns from './S2C/0x15-UpgradeSpellAns.js';
import Ping_Load_Info from './C2S/0x16-Ping_Load_Info.js';
import ChangeSlotSpellData from './S2C/0x17-ChangeSlotSpellData.js';
import MessageToClient from './S2C/0x18-MessageToClient.js';
import DisplayFloatingText from './S2C/0x19-DisplayFloatingText.js';
import Basic_Attack_Pos from './S2C/0x1A-Basic_Attack_Pos.js';
import ForceDead from './S2C/0x1B-ForceDead.js';
import BuffUpdateCount from './S2C/0x1C-BuffUpdateCount.js';
import WriteNavFlags_Acc from './C2S/0x1D-WriteNavFlags_Acc.js';
import BuffReplaceGroup from './S2C/0x1E-BuffReplaceGroup.js';
import SetAutocast from './S2C/0x1F-SetAutocast.js';
import SwapItemReq from './C2S/0x20-SwapItemReq.js';
import Die_EventHistory from './S2C/0x21-Die_EventHistory.js';
import UnitAddGold from './S2C/0x22-UnitAddGold.js';
import AddRegion from './S2C/0x23-AddRegion.js';
import MoveRegion from './S2C/0x24-MoveRegion.js';
import MoveCameraToPoint from './S2C/0x25-MoveCameraToPoint.js';
import LineMissileHitList from './S2C/0x26-LineMissileHitList.js';
import MuteVolumeCategory from './S2C/0x27-MuteVolumeCategory.js';
import ServerTick from './S2C/0x28-ServerTick.js';
import StopAnimation from './S2C/0x29-StopAnimation.js';
import AvatarInfo_Server from './S2C/0x2A-AvatarInfo_Server.js';
import DampenerSwitchStates from './S2C/0x2B-DampenerSwitchStates.js';
import World_SendCamera_Server_Acknologment from './S2C/0x2C-World_SendCamera_Server_Acknologment.js';
import ModifyDebugCircleRadius from './S2C/0x2D-ModifyDebugCircleRadius.js';
import World_SendCamera_Server from './C2S/0x2E-World_SendCamera_Server.js';
import HeroReincarnateAlive from './S2C/0x2F-HeroReincarnateAlive.js';
import BuffReplace from './S2C/0x30-BuffReplace.js';
import Pause from './S2C/0x31-Pause.js';
import SetFadeOut_Pop from './S2C/0x32-SetFadeOut_Pop.js';
import RemoveRegion from './S2C/0x33-RemoveRegion.js';
import InstantStop_Attack from './S2C/0x34-InstantStop_Attack.js';
import OnLeaveLocalVisibilityClient from './S2C/0x35-OnLeaveLocalVisibilityClient.js';
import ShowObjectiveText from './S2C/0x36-ShowObjectiveText.js';
import SpawnPet from './S2C/0x37-SpawnPet.js';
import FX_Kill from './S2C/0x38-FX_Kill.js';
import UpgradeSpellReq from './C2S/0x39-UpgradeSpellReq.js';
import UseObject from './C2S/0x3A-UseObject.js';
import MissileReplication from './S2C/0x3B-MissileReplication.js';
import MovementDriverReplication from './S2C/0x3C-MovementDriverReplication.js';
import HighlightHUDElement from './S2C/0x3D-HighlightHUDElement.js';
import SwapItemAns from './S2C/0x3E-SwapItemAns.js';
import LevelUp from './S2C/0x3F-LevelUp.js';
import MapPing from './S2C/0x40-MapPing.js';
import WriteNavFlags from './S2C/0x41-WriteNavFlags.js';
import PlayEmote from './S2C/0x42-PlayEmote.js';
import PlaySound from './S2C/0x43-PlaySound.js';
import PlayVOCommand from './S2C/0x44-PlayVOCommand.js';
import OnEventWorld from './S2C/0x45-OnEventWorld.js';
import HeroStats from './S2C/0x46-HeroStats.js';
import UpdateGameOptions from './C2S/0x47-UpdateGameOptions.js';
import PlayEmoteC2S from './C2S/0x48-PlayEmote.js';
import PlayVOCommandC2S from './C2S/0x49-PlayVOCommand.js';
import HeroReincarnate from './S2C/0x4A-HeroReincarnate.js';
import OnScoreBoardOpened from './C2S/0x4B-OnScoreBoardOpened.js';
import CreateHero from './S2C/0x4C-CreateHero.js';
import AddMemoryListener from './HANDSHAKE/0x4D-AddMemoryListener.js';
import HierarchicalMemoryUpdate from './HANDSHAKE/0x4E-HierarchicalMemoryUpdate.js';
import ToggleUIHighlight from './S2C/0x4F-ToggleUIHighlight.js';
import FaceDirection from './S2C/0x50-FaceDirection.js';
import OnLeaveVisibilityClient from './S2C/0x51-OnLeaveVisibilityClient.js';
import ClientReady from './C2S/0x52-ClientReady.js';
import SetItem from './S2C/0x53-SetItem.js';
import SynchVersion from './S2C/0x54-SynchVersion.js';
import HandleTipUpdate from './S2C/0x55-HandleTipUpdate.js';
import StatsUpdateReq from './C2S/0x56-StatsUpdateReq.js';
import MapPingC2S from './C2S/0x57-MapPing.js';
import RemoveDebugObject from './S2C/0x58-RemoveDebugObject.js';
import CreateUnitHighlight from './S2C/0x59-CreateUnitHighlight.js';
import DestroyClientMissile from './S2C/0x5A-DestroyClientMissile.js';
import SetSpellLevel from './S2C/0x5B-SetSpellLevel.js';
import StartGame from './S2C/0x5C-StartGame.js';
import OnShopOpened from './C2S/0x5D-OnShopOpened.js';
import Hero_Die from './S2C/0x5E-Hero_Die.js';
import FadeOutMainSFX from './S2C/0x5F-FadeOutMainSFX.js';
import PlayThemeMusic from './S2C/0x60-PlayThemeMusic.js';
import WaypointGroup from './LOW_PRIORITY/0x61-WaypointGroup.js';
import StartSpawn from './S2C/0x62-StartSpawn.js';
import CreateNeutral from './S2C/0x63-CreateNeutral.js';
import WaypointGroupWithSpeed from './S2C/0x64-WaypointGroupWithSpeed.js';
import UnitApplyDamage from './S2C/0x65-UnitApplyDamage.js';
import ModifyShield from './S2C/0x66-ModifyShield.js';
import PopCharacterData from './S2C/0x67-PopCharacterData.js';
import BuffAddGroup from './S2C/0x68-BuffAddGroup.js';
import AI_TargetSelection from './S2C/0x69-AI_TargetSelection.js';
import AI_Target from './S2C/0x6A-AI_Target.js';
import SetAnimStates from './S2C/0x6B-SetAnimStates.js';
import ChainMissileSync from './S2C/0x6C-ChainMissileSync.js';
import OnTipEvent from './C2S/0x6D-OnTipEvent.js';
import ForceCreateMissile from './S2C/0x6E-ForceCreateMissile.js';
import BuyItemAns from './S2C/0x6F-BuyItemAns.js';
import SetSpellData from './S2C/0x70-SetSpellData.js';
import PauseAnimation from './S2C/0x71-PauseAnimation.js';
import IssueOrderReq from './C2S/0x72-IssueOrderReq.js';
import CameraBehavior from './S2C/0x73-CameraBehavior.js';
import AnimatedBuildingSetCurrentSkin from './S2C/0x74-AnimatedBuildingSetCurrentSkin.js';
import Connected from './S2C/0x75-Connected.js';
import SyncSimTimeFinal from './GAMEPLAY/0x76-SyncSimTimeFinal.js';
import Waypoint_Acc from './C2S/0x77-Waypoint_Acc.js';
import LockCamera from './S2C/0x78-LockCamera.js';
import PlayVOAudioEvent from './S2C/0x79-PlayVOAudioEvent.js';
import AI_Command from './C2S/0x7A-AI_Command.js';
import BuffRemove2 from './S2C/0x7B-BuffRemove2.js';
import SpawnMinion from './S2C/0x7C-SpawnMinion.js';
import ClientCheatDetectionSignal from './C2S/0x7D-ClientCheatDetectionSignal.js';
import ToggleFoW from './S2C/0x7E-ToggleFoW.js';
import ToolTipVars from './S2C/0x7F-ToolTipVars.js';
import Unused128 from './S2C/0x80-Unused128.js';
import World_LockCamera_Server from './C2S/0x81-World_LockCamera_Server.js';
import BuyItemReq from './C2S/0x82-BuyItemReq.js';
import WaypointListHeroWithSpeed from './S2C/0x83-WaypointListHeroWithSpeed.js';
import SetInputLockFlag from './S2C/0x84-SetInputLockFlag.js';
import SetCooldown from './S2C/0x85-SetCooldown.js';
import CancelTargetingReticle from './S2C/0x86-CancelTargetingReticle.js';
import FX_Create_Group from './S2C/0x87-FX_Create_Group.js';
import QueryStatusAns from './S2C/0x88-QueryStatusAns.js';
import Building_Die from './S2C/0x89-Building_Die.js';
import PreloadCharacterData from './S2C/0x8A-PreloadCharacterData.js';
import RemoveListener from './HANDSHAKE/0x8B-RemoveListener.js';
import HandleQuestUpdate from './S2C/0x8C-HandleQuestUpdate.js';
import ClientFinished from './C2S/0x8D-ClientFinished.js';
import RemoveMemoryListener from './HANDSHAKE/0x8E-RemoveMemoryListener.js';
import Exit from './C2S/0x8F-Exit.js';
import ModifyDebugObjectColor from './S2C/0x90-ModifyDebugObjectColor.js';
import AddListener from './HANDSHAKE/0x91-AddListener.js';
import World_SendGameNumber from './C2S/0x92-World_SendGameNumber.js';
import World_SendGameNumberS2C from './S2C/0x92-World_SendGameNumber.js';
import SetPARState from './S2C/0x93-SetPARState.js';
import BuffRemoveGroup from './S2C/0x94-BuffRemoveGroup.js';
import Ping_Load_InfoLOW_PRIORITY from './LOW_PRIORITY/0x95-Ping_Load_Info.js';
import ChangeCharacterVoice from './S2C/0x96-ChangeCharacterVoice.js';
import ChangeCharacterData from './S2C/0x97-ChangeCharacterData.js';
import ExitS2C from './S2C/0x98-Exit.js';
import RemoveBBProfileListener from './HANDSHAKE/0x99-RemoveBBProfileListener.js';
import CastSpellReq from './C2S/0x9A-CastSpellReq.js';
import ToggleInputLockFlag from './S2C/0x9B-ToggleInputLockFlag.js';
import SoftReconnect from './C2S/0x9C-SoftReconnect.js';
import CreateTurret from './S2C/0x9D-CreateTurret.js';
import Die from './S2C/0x9E-Die.js';
import UseItemAns from './S2C/0x9F-UseItemAns.js';
import ShowAuxiliaryText from './S2C/0xA0-ShowAuxiliaryText.js';
import PausePacket from './C2S/0xA1-PausePacket.js';
import HideObjectiveText from './S2C/0xA2-HideObjectiveText.js';
import OnEvent from './S2C/0xA3-OnEvent.js';
import TeamSurrenderVote from './C2S/0xA4-TeamSurrenderVote.js';
import TeamSurrenderStatus from './S2C/0xA5-TeamSurrenderStatus.js';
import AddBBProfileListener from './HANDSHAKE/0xA6-AddBBProfileListener.js';
import HideAuxiliaryText from './S2C/0xA7-HideAuxiliaryText.js';
import OnReplication_Acc from './C2S/0xA8-OnReplication_Acc.js';
import SetGreyscaleEnabledWhenDead from './S2C/0xA9-SetGreyscaleEnabledWhenDead.js';
import AI_State from './S2C/0xAA-AI_State.js';
import SetFoWStatus from './S2C/0xAB-SetFoWStatus.js';
import ReloadScripts from './S2C/0xAC-ReloadScripts.js';
import Cheat from './S2C/0xAD-Cheat.js';
import OnEnterLocalVisibilityClient from './S2C/0xAE-OnEnterLocalVisibilityClient.js';
import SendSelectedObjId from './C2S/0xAF-SendSelectedObjId.js';
import PlayAnimation from './S2C/0xB0-PlayAnimation.js';
import RefreshAuxiliaryText from './S2C/0xB1-RefreshAuxiliaryText.js';
import SetFadeOut_Push from './S2C/0xB2-SetFadeOut_Push.js';
import OpenTutorialPopup from './S2C/0xB3-OpenTutorialPopup.js';
import RemoveUnitHighlight from './S2C/0xB4-RemoveUnitHighlight.js';
import CastSpellAns from './S2C/0xB5-CastSpellAns.js';
import HierarchicalBBProfileUpdate from './HANDSHAKE/0xB6-HierarchicalBBProfileUpdate.js';
import BuffAdd2 from './S2C/0xB7-BuffAdd2.js';
import OpenAFKWarningMessage from './S2C/0xB8-OpenAFKWarningMessage.js';
import WaypointList from './S2C/0xB9-WaypointList.js';
import OnEnterVisibilityClient from './S2C/0xBA-OnEnterVisibilityClient.js';
import AddDebugObject from './S2C/0xBB-AddDebugObject.js';
import DisableHUDForEndOfGame from './S2C/0xBC-DisableHUDForEndOfGame.js';
import SynchVersionC2S from './C2S/0xBD-SynchVersion.js';
import CharSelected from './C2S/0xBE-CharSelected.js';
import BuffUpdateCountGroup from './S2C/0xBF-BuffUpdateCountGroup.js';
import AI_TargetHero from './S2C/0xC0-AI_TargetHero.js';
import SynchSimTimeS2C from './S2C/0xC1-SynchSimTime.js';
import SyncMissionStartTime from './S2C/0xC2-SyncMissionStartTime.js';
import Neutral_Camp_Empty from './S2C/0xC3-Neutral_Camp_Empty.js';
import OnReplication from './LOW_PRIORITY/0xC4-OnReplication.js';
import EndOfGameEvent from './S2C/0xC5-EndOfGameEvent.js';
import EndGame from './S2C/0xC6-EndGame.js';
import SamplingProfilerUpdate from './HANDSHAKE/0xC7-SamplingProfilerUpdate.js';
import PopAllCharacterData from './S2C/0xC8-PopAllCharacterData.js';
import TeamSurrenderVoteS2C from './S2C/0xC9-TeamSurrenderVote.js';
import HandleUIHighlight from './S2C/0xCA-HandleUIHighlight.js';
import FadeMinions from './S2C/0xCB-FadeMinions.js';
import OnTutorialPopupClosed from './C2S/0xCC-OnTutorialPopupClosed.js';
import OnQuestEvent from './C2S/0xCD-OnQuestEvent.js';
import ShowHealthBar from './S2C/0xCE-ShowHealthBar.js';
import SpawnBot from './S2C/0xCF-SpawnBot.js';
import SpawnLevelProp from './S2C/0xD0-SpawnLevelProp.js';
import UpdateLevelProp from './S2C/0xD1-UpdateLevelProp.js';
import AttachFlexParticle from './S2C/0xD2-AttachFlexParticle.js';
import HandleCapturePointUpdate from './S2C/0xD3-HandleCapturePointUpdate.js';
import HandleGameScore from './S2C/0xD4-HandleGameScore.js';
import HandleRespawnPointUpdate from './S2C/0xD5-HandleRespawnPointUpdate.js';
import OnRespawnPointEvent from './C2S/0xD6-OnRespawnPointEvent.js';
import UnitChangeTeam from './S2C/0xD7-UnitChangeTeam.js';
import UnitSetMinimapIcon from './S2C/0xD8-UnitSetMinimapIcon.js';
import IncrementPlayerScore from './S2C/0xD9-IncrementPlayerScore.js';
import IncrementPlayerStat from './S2C/0xDA-IncrementPlayerStat.js';
import ColorRemapFX from './S2C/0xDB-ColorRemapFX.js';
import InteractiveMusicCommand from './S2C/0xDC-InteractiveMusicCommand.js';
import AntiBot from './S2C/0xDD-AntiBot.js';
import AntiBotAction from './S2C/0xDE-AntiBotAction.js';
import AntiBotC2S from './C2S/0xDF-AntiBot.js';
import OnEnterTeamVisibility from './S2C/0xE0-OnEnterTeamVisibility.js';
import FX_OnEnterTeamVisibility from './S2C/0xE2-FX_OnEnterTeamVisibility.js';
import ReplayOnly_GoldEarned from './S2C/0xE4-ReplayOnly_GoldEarned.js';
import CloseClient from './S2C/0xE5-CloseClient.js';
import SpellChargeUpdateReq from './C2S/0xE6-SpellChargeUpdateReq.js';
import ModifyDebugText from './S2C/0xE7-ModifyDebugText.js';
import SetDebugHidden from './S2C/0xE8-SetDebugHidden.js';
import ActivateMinionCamp from './S2C/0xE9-ActivateMinionCamp.js';
import SpectatorDataReq from './C2S/0xEA-SpectatorDataReq.js';
import SpectatorMetaData from './S2C/0xEB-SpectatorMetaData.js';
import SpectatorDataChunkInfo from './S2C/0xEC-SpectatorDataChunkInfo.js';
import SpectatorDataChunk from './S2C/0xED-SpectatorDataChunk.js';
import ChangeMissileTarget from './S2C/0xEE-ChangeMissileTarget.js';
import MarkOrSweepForSoftReconnect from './S2C/0xEF-MarkOrSweepForSoftReconnect.js';
import SetShopEnabled from './S2C/0xF0-SetShopEnabled.js';
import CreateFollowerObject from './S2C/0xF1-CreateFollowerObject.js';
import ReattachFollowerObject from './S2C/0xF2-ReattachFollowerObject.js';
import PlayContextualEmote from './S2C/0xF3-PlayContextualEmote.js';
import PlayContextualEmoteC2S from './C2S/0xF4-PlayContextualEmote.js';
import SetHoverIndicatorTarget from './S2C/0xF5-SetHoverIndicatorTarget.js';
import SetHoverIndicatorEnabled from './S2C/0xF6-SetHoverIndicatorEnabled.js';
import SystemMessage from './S2C/0xF7-SystemMessage.js';
import ChangeEmitterGroup from './S2C/0xF8-ChangeEmitterGroup.js';
import UpdateRestrictedChatCount from './S2C/0xF9-UpdateRestrictedChatCount.js';
import TeamBalanceVote from './S2C/0xFA-TeamBalanceVote.js';
import TeamBalanceVoteC2S from './C2S/0xFB-TeamBalanceVote.js';
import TeamBalanceStatus from './S2C/0xFC-TeamBalanceStatus.js';
import SetItemCharges from './S2C/0xFD-SetItemCharges.js';
import SpawnMarker from './S2C/0x0100-SpawnMarker.js';
import UnitSetAutoAttackGroundAllowed from './S2C/0x0101-UnitSetAutoAttackGroundAllowed.js';
import UnitSetShowAutoAttackIndicator from './S2C/0x0102-UnitSetShowAutoAttackIndicator.js';
import AnimationUpdateTimeStep from './S2C/0x0103-AnimationUpdateTimeStep.js';
import UnitSetSpellPARCost from './S2C/0x0104-UnitSetSpellPARCost.js';
import UnitSetDrawPathMode from './S2C/0x0105-UnitSetDrawPathMode.js';
import UnitSendDrawPath from './C2S/0x0106-UnitSendDrawPath.js';
import AmmoUpdate from './S2C/0x0107-AmmoUpdate.js';
import UnitSetCursorReticle from './S2C/0x0108-UnitSetCursorReticle.js';
import BuffUpdateNumCounter from './S2C/0x0109-BuffUpdateNumCounter.js';
import UndoItemReq from './C2S/0x010A-UndoItemReq.js';
import SetUndoEnabled from './S2C/0x010B-SetUndoEnabled.js';
import SetInventory from './S2C/0x010C-SetInventory.js';
import ChangeMissileSpeed from './S2C/0x010D-ChangeMissileSpeed.js';
import SetCanSurrender from './S2C/0x010E-SetCanSurrender.js';
import UnitSetLookAt from './S2C/0x010F-UnitSetLookAt.js';
import DestroyUnit from './S2C/0x0110-DestroyUnit.js';
import UnitSetSpellLevelOverrides from './S2C/0x0111-UnitSetSpellLevelOverrides.js';
import UnitSetMaxLevelOverride from './S2C/0x0112-UnitSetMaxLevelOverride.js';
import UnitSetPARType from './S2C/0x0113-UnitSetPARType.js';
import MoveMarker from './S2C/0x0114-MoveMarker.js';
import ReplayOnly_MultiKillCountUpdate from './S2C/0x0115-ReplayOnly_MultiKillCountUpdate.js';
import NeutralMinionTimerUpdate from './S2C/0x0116-NeutralMinionTimerUpdate.js';
import UpdateDeathTimer from './S2C/0x0117-UpdateDeathTimer.js';
import UpdateSpellToggle from './S2C/0x0118-UpdateSpellToggle.js';
import UpdateBounceMissile from './S2C/0x0119-UpdateBounceMissile.js';
import DebugLogGoldSources from './S2C/0x011A-DebugLogGoldSources.js';
import CheatLogGoldSources from './C2S/0x011B-CheatLogGoldSources.js';
import ShopItemSubstitutionSet from './S2C/0x011C-ShopItemSubstitutionSet.js';
import ShopItemSubstitutionClear from './S2C/0x011D-ShopItemSubstitutionClear.js';
import ResetClient from './S2C/0x011E-ResetClient.js';
import IncrementMinionKills from './S2C/0x011F-IncrementMinionKills.js';
import UpdateAttackSpeedCapOverrides from './S2C/0x0120-UpdateAttackSpeedCapOverrides.js';
import NotifyContextualSituation from './S2C/0x0121-NotifyContextualSituation.js';
import CreateMinionCamp from './S2C/0x0122-CreateMinionCamp.js';
import SpawnTurret from './S2C/0x0123-SpawnTurret.js';
import UpdateAscended from './S2C/0x0124-UpdateAscended.js';
import ChangeSlotSpellData_OwnerOnly from './S2C/0x0125-ChangeSlotSpellData_OwnerOnly.js';
import Die_MapView from './S2C/0x0126-Die_MapView.js';
import SetInventory_MapView from './S2C/0x0127-SetInventory_MapView.js';
import MessageToClient_MapView from './S2C/0x0128-MessageToClient_MapView.js';
import StartSpellTargeter from './S2C/0x0129-StartSpellTargeter.js';
import StopSpellTargeter from './S2C/0x012A-StopSpellTargeter.js';
import CameraLock from './S2C/0x012B-CameraLock.js';
import TeamUpdateDragonBuffCount from './S2C/0x012C-TeamUpdateDragonBuffCount.js';
import SetFadeOut from './S2C/0x012D-SetFadeOut.js';
import AddConeRegion from './S2C/0x012E-AddConeRegion.js';
import UnlockAnimation from './S2C/0x012F-UnlockAnimation.js';

import registerPacket from './register.js';
import channels from './channels.js';
import packetIds from './ids.js';

registerPacket(channels.HANDSHAKE, 0, KEY_CHECK);
registerPacket(channels.LOADING_SCREEN, 100, RequestJoinTeam);
registerPacket(channels.LOADING_SCREEN, 101, RequestReskin);
registerPacket(channels.LOADING_SCREEN, 102, RequestRename);
registerPacket(channels.LOADING_SCREEN, 103, TeamRosterUpdate);
registerPacket(channels.COMMUNICATION, 104, Chat);
registerPacket(channels.COMMUNICATION, 105, QuickChat);
registerPacket(channels.HANDSHAKE, packetIds.HierarchicalProfilerUpdate, HierarchicalProfilerUpdate);
registerPacket(channels.S2C, packetIds.DisplayLocalizedTutorialChatText, DisplayLocalizedTutorialChatText);
registerPacket(channels.S2C, packetIds.Barrack_SpawnUnit, Barrack_SpawnUnit);
registerPacket(channels.S2C, packetIds.SwitchNexusesToOnIdleParticles, SwitchNexusesToOnIdleParticles);
registerPacket(channels.C2S, packetIds.TutorialAudioEventFinished, TutorialAudioEventFinished);
registerPacket(channels.S2C, packetIds.SetCircularMovementRestriction, SetCircularMovementRestriction);
registerPacket(channels.S2C, packetIds.UpdateGoldRedirectTarget, UpdateGoldRedirectTarget);
registerPacket(channels.GAMEPLAY, packetIds.SynchSimTime, SynchSimTime);
registerPacket(channels.C2S, packetIds.RemoveItemReq, RemoveItemReq);
registerPacket(channels.C2S, packetIds.ResumePacket, ResumePacket);
registerPacket(channels.S2C, packetIds.RemoveItemAns, RemoveItemAns);
registerPacket(channels.S2C, packetIds.Basic_Attack, Basic_Attack);
registerPacket(channels.S2C, packetIds.ReplaceObjectiveText, ReplaceObjectiveText);
registerPacket(channels.S2C, packetIds.CloseShop, CloseShop);
registerPacket(channels.S2C, packetIds.Reconnect, Reconnect);
registerPacket(channels.S2C, packetIds.UnitAddEXP, UnitAddEXP);
registerPacket(channels.S2C, packetIds.EndSpawn, EndSpawn);
registerPacket(channels.S2C, packetIds.SetFrequency, SetFrequency);
registerPacket(channels.S2C, packetIds.BotAI, BotAI);
registerPacket(channels.C2S, packetIds.QueryStatusReq, QueryStatusReq);
registerPacket(channels.S2C, packetIds.UpgradeSpellAns, UpgradeSpellAns);
registerPacket(channels.C2S, packetIds.Ping_Load_Info, Ping_Load_Info);
registerPacket(channels.S2C, packetIds.ChangeSlotSpellData, ChangeSlotSpellData);
registerPacket(channels.S2C, packetIds.MessageToClient, MessageToClient);
registerPacket(channels.S2C, packetIds.DisplayFloatingText, DisplayFloatingText);
registerPacket(channels.S2C, packetIds.Basic_Attack_Pos, Basic_Attack_Pos);
registerPacket(channels.S2C, packetIds.ForceDead, ForceDead);
registerPacket(channels.S2C, packetIds.BuffUpdateCount, BuffUpdateCount);
registerPacket(channels.C2S, packetIds.WriteNavFlags_Acc, WriteNavFlags_Acc);
registerPacket(channels.S2C, packetIds.BuffReplaceGroup, BuffReplaceGroup);
registerPacket(channels.S2C, packetIds.SetAutocast, SetAutocast);
registerPacket(channels.C2S, packetIds.SwapItemReq, SwapItemReq);
registerPacket(channels.S2C, packetIds.Die_EventHistory, Die_EventHistory);
registerPacket(channels.S2C, packetIds.UnitAddGold, UnitAddGold);
registerPacket(channels.S2C, packetIds.AddRegion, AddRegion);
registerPacket(channels.S2C, packetIds.MoveRegion, MoveRegion);
registerPacket(channels.S2C, packetIds.MoveCameraToPoint, MoveCameraToPoint);
registerPacket(channels.S2C, packetIds.LineMissileHitList, LineMissileHitList);
registerPacket(channels.S2C, packetIds.MuteVolumeCategory, MuteVolumeCategory);
registerPacket(channels.S2C, packetIds.ServerTick, ServerTick);
registerPacket(channels.S2C, packetIds.StopAnimation, StopAnimation);
registerPacket(channels.S2C, packetIds.AvatarInfo_Server, AvatarInfo_Server);
registerPacket(channels.S2C, packetIds.DampenerSwitchStates, DampenerSwitchStates);
registerPacket(channels.S2C, packetIds.World_SendCamera_Server_Acknologment, World_SendCamera_Server_Acknologment);
registerPacket(channels.S2C, packetIds.ModifyDebugCircleRadius, ModifyDebugCircleRadius);
registerPacket(channels.C2S, packetIds.World_SendCamera_Server, World_SendCamera_Server);
registerPacket(channels.S2C, packetIds.HeroReincarnateAlive, HeroReincarnateAlive);
registerPacket(channels.S2C, packetIds.BuffReplace, BuffReplace);
registerPacket(channels.S2C, packetIds.Pause, Pause);
registerPacket(channels.S2C, packetIds.SetFadeOut_Pop, SetFadeOut_Pop);
registerPacket(channels.S2C, packetIds.RemoveRegion, RemoveRegion);
registerPacket(channels.S2C, packetIds.InstantStop_Attack, InstantStop_Attack);
registerPacket(channels.S2C, packetIds.OnLeaveLocalVisibilityClient, OnLeaveLocalVisibilityClient);
registerPacket(channels.S2C, packetIds.ShowObjectiveText, ShowObjectiveText);
registerPacket(channels.S2C, packetIds.SpawnPet, SpawnPet);
registerPacket(channels.S2C, packetIds.FX_Kill, FX_Kill);
registerPacket(channels.C2S, packetIds.UpgradeSpellReq, UpgradeSpellReq);
registerPacket(channels.C2S, packetIds.UseObject, UseObject);
registerPacket(channels.S2C, packetIds.MissileReplication, MissileReplication);
registerPacket(channels.S2C, packetIds.MovementDriverReplication, MovementDriverReplication);
registerPacket(channels.S2C, packetIds.HighlightHUDElement, HighlightHUDElement);
registerPacket(channels.S2C, packetIds.SwapItemAns, SwapItemAns);
registerPacket(channels.S2C, packetIds.LevelUp, LevelUp);
registerPacket(channels.S2C, packetIds.MapPing, MapPing);
registerPacket(channels.S2C, packetIds.WriteNavFlags, WriteNavFlags);
registerPacket(channels.S2C, packetIds.PlayEmote, PlayEmote);
registerPacket(channels.S2C, packetIds.PlaySound, PlaySound);
registerPacket(channels.S2C, packetIds.PlayVOCommand, PlayVOCommand);
registerPacket(channels.S2C, packetIds.OnEventWorld, OnEventWorld);
registerPacket(channels.S2C, packetIds.HeroStats, HeroStats);
registerPacket(channels.C2S, packetIds.UpdateGameOptions, UpdateGameOptions);
registerPacket(channels.C2S, packetIds.PlayEmoteC2S, PlayEmoteC2S);
registerPacket(channels.C2S, packetIds.PlayVOCommandC2S, PlayVOCommandC2S);
registerPacket(channels.S2C, packetIds.HeroReincarnate, HeroReincarnate);
registerPacket(channels.C2S, packetIds.OnScoreBoardOpened, OnScoreBoardOpened);
registerPacket(channels.S2C, packetIds.CreateHero, CreateHero);
registerPacket(channels.HANDSHAKE, packetIds.AddMemoryListener, AddMemoryListener);
registerPacket(channels.HANDSHAKE, packetIds.HierarchicalMemoryUpdate, HierarchicalMemoryUpdate);
registerPacket(channels.S2C, packetIds.ToggleUIHighlight, ToggleUIHighlight);
registerPacket(channels.S2C, packetIds.FaceDirection, FaceDirection);
registerPacket(channels.S2C, packetIds.OnLeaveVisibilityClient, OnLeaveVisibilityClient);
registerPacket(channels.C2S, packetIds.ClientReady, ClientReady);
registerPacket(channels.S2C, packetIds.SetItem, SetItem);
registerPacket(channels.S2C, packetIds.SynchVersion, SynchVersion);
registerPacket(channels.S2C, packetIds.HandleTipUpdate, HandleTipUpdate);
registerPacket(channels.C2S, packetIds.StatsUpdateReq, StatsUpdateReq);
registerPacket(channels.C2S, packetIds.MapPingC2S, MapPingC2S);
registerPacket(channels.S2C, packetIds.RemoveDebugObject, RemoveDebugObject);
registerPacket(channels.S2C, packetIds.CreateUnitHighlight, CreateUnitHighlight);
registerPacket(channels.S2C, packetIds.DestroyClientMissile, DestroyClientMissile);
registerPacket(channels.S2C, packetIds.SetSpellLevel, SetSpellLevel);
registerPacket(channels.S2C, packetIds.StartGame, StartGame);
registerPacket(channels.C2S, packetIds.OnShopOpened, OnShopOpened);
registerPacket(channels.S2C, packetIds.Hero_Die, Hero_Die);
registerPacket(channels.S2C, packetIds.FadeOutMainSFX, FadeOutMainSFX);
registerPacket(channels.S2C, packetIds.PlayThemeMusic, PlayThemeMusic);
registerPacket(channels.LOW_PRIORITY, packetIds.WaypointGroup, WaypointGroup);
registerPacket(channels.S2C, packetIds.StartSpawn, StartSpawn);
registerPacket(channels.S2C, packetIds.CreateNeutral, CreateNeutral);
registerPacket(channels.S2C, packetIds.WaypointGroupWithSpeed, WaypointGroupWithSpeed);
registerPacket(channels.S2C, packetIds.UnitApplyDamage, UnitApplyDamage);
registerPacket(channels.S2C, packetIds.ModifyShield, ModifyShield);
registerPacket(channels.S2C, packetIds.PopCharacterData, PopCharacterData);
registerPacket(channels.S2C, packetIds.BuffAddGroup, BuffAddGroup);
registerPacket(channels.S2C, packetIds.AI_TargetSelection, AI_TargetSelection);
registerPacket(channels.S2C, packetIds.AI_Target, AI_Target);
registerPacket(channels.S2C, packetIds.SetAnimStates, SetAnimStates);
registerPacket(channels.S2C, packetIds.ChainMissileSync, ChainMissileSync);
registerPacket(channels.C2S, packetIds.OnTipEvent, OnTipEvent);
registerPacket(channels.S2C, packetIds.ForceCreateMissile, ForceCreateMissile);
registerPacket(channels.S2C, packetIds.BuyItemAns, BuyItemAns);
registerPacket(channels.S2C, packetIds.SetSpellData, SetSpellData);
registerPacket(channels.S2C, packetIds.PauseAnimation, PauseAnimation);
registerPacket(channels.C2S, packetIds.IssueOrderReq, IssueOrderReq);
registerPacket(channels.S2C, packetIds.CameraBehavior, CameraBehavior);
registerPacket(channels.S2C, packetIds.AnimatedBuildingSetCurrentSkin, AnimatedBuildingSetCurrentSkin);
registerPacket(channels.S2C, packetIds.Connected, Connected);
registerPacket(channels.GAMEPLAY, packetIds.SyncSimTimeFinal, SyncSimTimeFinal);
registerPacket(channels.C2S, packetIds.Waypoint_Acc, Waypoint_Acc);
registerPacket(channels.S2C, packetIds.LockCamera, LockCamera);
registerPacket(channels.S2C, packetIds.PlayVOAudioEvent, PlayVOAudioEvent);
registerPacket(channels.C2S, packetIds.AI_Command, AI_Command);
registerPacket(channels.S2C, packetIds.BuffRemove2, BuffRemove2);
registerPacket(channels.S2C, packetIds.SpawnMinion, SpawnMinion);
registerPacket(channels.C2S, packetIds.ClientCheatDetectionSignal, ClientCheatDetectionSignal);
registerPacket(channels.S2C, packetIds.ToggleFoW, ToggleFoW);
registerPacket(channels.S2C, packetIds.ToolTipVars, ToolTipVars);
registerPacket(channels.S2C, packetIds.Unused128, Unused128);
registerPacket(channels.C2S, packetIds.World_LockCamera_Server, World_LockCamera_Server);
registerPacket(channels.C2S, packetIds.BuyItemReq, BuyItemReq);
registerPacket(channels.S2C, packetIds.WaypointListHeroWithSpeed, WaypointListHeroWithSpeed);
registerPacket(channels.S2C, packetIds.SetInputLockFlag, SetInputLockFlag);
registerPacket(channels.S2C, packetIds.SetCooldown, SetCooldown);
registerPacket(channels.S2C, packetIds.CancelTargetingReticle, CancelTargetingReticle);
registerPacket(channels.S2C, packetIds.FX_Create_Group, FX_Create_Group);
registerPacket(channels.S2C, packetIds.QueryStatusAns, QueryStatusAns);
registerPacket(channels.S2C, packetIds.Building_Die, Building_Die);
registerPacket(channels.S2C, packetIds.PreloadCharacterData, PreloadCharacterData);
registerPacket(channels.HANDSHAKE, packetIds.RemoveListener, RemoveListener);
registerPacket(channels.S2C, packetIds.HandleQuestUpdate, HandleQuestUpdate);
registerPacket(channels.C2S, packetIds.ClientFinished, ClientFinished);
registerPacket(channels.HANDSHAKE, packetIds.RemoveMemoryListener, RemoveMemoryListener);
registerPacket(channels.C2S, packetIds.Exit, Exit);
registerPacket(channels.S2C, packetIds.ModifyDebugObjectColor, ModifyDebugObjectColor);
registerPacket(channels.HANDSHAKE, packetIds.AddListener, AddListener);
registerPacket(channels.C2S, packetIds.World_SendGameNumber, World_SendGameNumber);
registerPacket(channels.S2C, packetIds.World_SendGameNumber, World_SendGameNumberS2C);
registerPacket(channels.S2C, packetIds.SetPARState, SetPARState);
registerPacket(channels.S2C, packetIds.BuffRemoveGroup, BuffRemoveGroup);
registerPacket(channels.LOW_PRIORITY, packetIds.Ping_Load_InfoS2C, Ping_Load_InfoLOW_PRIORITY);
registerPacket(channels.S2C, packetIds.ChangeCharacterVoice, ChangeCharacterVoice);
registerPacket(channels.S2C, packetIds.ChangeCharacterData, ChangeCharacterData);
registerPacket(channels.S2C, packetIds.ExitS2C, ExitS2C);
registerPacket(channels.HANDSHAKE, packetIds.RemoveBBProfileListener, RemoveBBProfileListener);
registerPacket(channels.C2S, packetIds.CastSpellReq, CastSpellReq);
registerPacket(channels.S2C, packetIds.ToggleInputLockFlag, ToggleInputLockFlag);
registerPacket(channels.C2S, packetIds.SoftReconnect, SoftReconnect);
registerPacket(channels.S2C, packetIds.CreateTurret, CreateTurret);
registerPacket(channels.S2C, packetIds.Die, Die);
registerPacket(channels.S2C, packetIds.UseItemAns, UseItemAns);
registerPacket(channels.S2C, packetIds.ShowAuxiliaryText, ShowAuxiliaryText);
registerPacket(channels.C2S, packetIds.PausePacket, PausePacket);
registerPacket(channels.S2C, packetIds.HideObjectiveText, HideObjectiveText);
registerPacket(channels.S2C, packetIds.OnEvent, OnEvent);
registerPacket(channels.C2S, packetIds.TeamSurrenderVote, TeamSurrenderVote);
registerPacket(channels.S2C, packetIds.TeamSurrenderStatus, TeamSurrenderStatus);
registerPacket(channels.HANDSHAKE, packetIds.AddBBProfileListener, AddBBProfileListener);
registerPacket(channels.S2C, packetIds.HideAuxiliaryText, HideAuxiliaryText);
registerPacket(channels.C2S, packetIds.OnReplication_Acc, OnReplication_Acc);
registerPacket(channels.S2C, packetIds.SetGreyscaleEnabledWhenDead, SetGreyscaleEnabledWhenDead);
registerPacket(channels.S2C, packetIds.AI_State, AI_State);
registerPacket(channels.S2C, packetIds.SetFoWStatus, SetFoWStatus);
registerPacket(channels.S2C, packetIds.ReloadScripts, ReloadScripts);
registerPacket(channels.S2C, packetIds.Cheat, Cheat);
registerPacket(channels.S2C, packetIds.OnEnterLocalVisibilityClient, OnEnterLocalVisibilityClient);
registerPacket(channels.C2S, packetIds.SendSelectedObjId, SendSelectedObjId);
registerPacket(channels.S2C, packetIds.PlayAnimation, PlayAnimation);
registerPacket(channels.S2C, packetIds.RefreshAuxiliaryText, RefreshAuxiliaryText);
registerPacket(channels.S2C, packetIds.SetFadeOut_Push, SetFadeOut_Push);
registerPacket(channels.S2C, packetIds.OpenTutorialPopup, OpenTutorialPopup);
registerPacket(channels.S2C, packetIds.RemoveUnitHighlight, RemoveUnitHighlight);
registerPacket(channels.S2C, packetIds.CastSpellAns, CastSpellAns);
registerPacket(channels.HANDSHAKE, packetIds.HierarchicalBBProfileUpdate, HierarchicalBBProfileUpdate);
registerPacket(channels.S2C, packetIds.BuffAdd2, BuffAdd2);
registerPacket(channels.S2C, packetIds.OpenAFKWarningMessage, OpenAFKWarningMessage);
registerPacket(channels.S2C, packetIds.WaypointList, WaypointList);
registerPacket(channels.S2C, packetIds.OnEnterVisibilityClient, OnEnterVisibilityClient);
registerPacket(channels.S2C, packetIds.AddDebugObject, AddDebugObject);
registerPacket(channels.S2C, packetIds.DisableHUDForEndOfGame, DisableHUDForEndOfGame);
registerPacket(channels.C2S, packetIds.SynchVersionC2S, SynchVersionC2S);
registerPacket(channels.C2S, packetIds.CharSelected, CharSelected);
registerPacket(channels.S2C, packetIds.BuffUpdateCountGroup, BuffUpdateCountGroup);
registerPacket(channels.S2C, packetIds.AI_TargetHero, AI_TargetHero);
registerPacket(channels.S2C, packetIds.SynchSimTimeS2C, SynchSimTimeS2C);
registerPacket(channels.S2C, packetIds.SyncMissionStartTime, SyncMissionStartTime);
registerPacket(channels.S2C, packetIds.Neutral_Camp_Empty, Neutral_Camp_Empty);
registerPacket(channels.LOW_PRIORITY, packetIds.OnReplication, OnReplication);
registerPacket(channels.S2C, packetIds.EndOfGameEvent, EndOfGameEvent);
registerPacket(channels.S2C, packetIds.EndGame, EndGame);
registerPacket(channels.HANDSHAKE, packetIds.SamplingProfilerUpdate, SamplingProfilerUpdate);
registerPacket(channels.S2C, packetIds.PopAllCharacterData, PopAllCharacterData);
registerPacket(channels.S2C, packetIds.TeamSurrenderVoteS2C, TeamSurrenderVoteS2C);
registerPacket(channels.S2C, packetIds.HandleUIHighlight, HandleUIHighlight);
registerPacket(channels.S2C, packetIds.FadeMinions, FadeMinions);
registerPacket(channels.C2S, packetIds.OnTutorialPopupClosed, OnTutorialPopupClosed);
registerPacket(channels.C2S, packetIds.OnQuestEvent, OnQuestEvent);
registerPacket(channels.S2C, packetIds.ShowHealthBar, ShowHealthBar);
registerPacket(channels.S2C, packetIds.SpawnBot, SpawnBot);
registerPacket(channels.S2C, packetIds.SpawnLevelProp, SpawnLevelProp);
registerPacket(channels.S2C, packetIds.UpdateLevelProp, UpdateLevelProp);
registerPacket(channels.S2C, packetIds.AttachFlexParticle, AttachFlexParticle);
registerPacket(channels.S2C, packetIds.HandleCapturePointUpdate, HandleCapturePointUpdate);
registerPacket(channels.S2C, packetIds.HandleGameScore, HandleGameScore);
registerPacket(channels.S2C, packetIds.HandleRespawnPointUpdate, HandleRespawnPointUpdate);
registerPacket(channels.C2S, packetIds.OnRespawnPointEvent, OnRespawnPointEvent);
registerPacket(channels.S2C, packetIds.UnitChangeTeam, UnitChangeTeam);
registerPacket(channels.S2C, packetIds.UnitSetMinimapIcon, UnitSetMinimapIcon);
registerPacket(channels.S2C, packetIds.IncrementPlayerScore, IncrementPlayerScore);
registerPacket(channels.S2C, packetIds.IncrementPlayerStat, IncrementPlayerStat);
registerPacket(channels.S2C, packetIds.ColorRemapFX, ColorRemapFX);
registerPacket(channels.S2C, packetIds.InteractiveMusicCommand, InteractiveMusicCommand);
registerPacket(channels.S2C, packetIds.AntiBot, AntiBot);
registerPacket(channels.S2C, packetIds.AntiBotAction, AntiBotAction);
registerPacket(channels.C2S, packetIds.AntiBotC2S, AntiBotC2S);
registerPacket(channels.S2C, packetIds.OnEnterTeamVisibility, OnEnterTeamVisibility);
registerPacket(channels.S2C, packetIds.FX_OnEnterTeamVisibility, FX_OnEnterTeamVisibility);
registerPacket(channels.S2C, packetIds.ReplayOnly_GoldEarned, ReplayOnly_GoldEarned);
registerPacket(channels.S2C, packetIds.CloseClient, CloseClient);
registerPacket(channels.C2S, packetIds.SpellChargeUpdateReq, SpellChargeUpdateReq);
registerPacket(channels.S2C, packetIds.ModifyDebugText, ModifyDebugText);
registerPacket(channels.S2C, packetIds.SetDebugHidden, SetDebugHidden);
registerPacket(channels.S2C, packetIds.ActivateMinionCamp, ActivateMinionCamp);
registerPacket(channels.C2S, packetIds.SpectatorDataReq, SpectatorDataReq);
registerPacket(channels.S2C, packetIds.SpectatorMetaData, SpectatorMetaData);
registerPacket(channels.S2C, packetIds.SpectatorDataChunkInfo, SpectatorDataChunkInfo);
registerPacket(channels.S2C, packetIds.SpectatorDataChunk, SpectatorDataChunk);
registerPacket(channels.S2C, packetIds.ChangeMissileTarget, ChangeMissileTarget);
registerPacket(channels.S2C, packetIds.MarkOrSweepForSoftReconnect, MarkOrSweepForSoftReconnect);
registerPacket(channels.S2C, packetIds.SetShopEnabled, SetShopEnabled);
registerPacket(channels.S2C, packetIds.CreateFollowerObject, CreateFollowerObject);
registerPacket(channels.S2C, packetIds.ReattachFollowerObject, ReattachFollowerObject);
registerPacket(channels.S2C, packetIds.PlayContextualEmote, PlayContextualEmote);
registerPacket(channels.C2S, packetIds.PlayContextualEmoteC2S, PlayContextualEmoteC2S);
registerPacket(channels.S2C, packetIds.SetHoverIndicatorTarget, SetHoverIndicatorTarget);
registerPacket(channels.S2C, packetIds.SetHoverIndicatorEnabled, SetHoverIndicatorEnabled);
registerPacket(channels.S2C, packetIds.SystemMessage, SystemMessage);
registerPacket(channels.S2C, packetIds.ChangeEmitterGroup, ChangeEmitterGroup);
registerPacket(channels.S2C, packetIds.UpdateRestrictedChatCount, UpdateRestrictedChatCount);
registerPacket(channels.S2C, packetIds.TeamBalanceVote, TeamBalanceVote);
registerPacket(channels.C2S, packetIds.TeamBalanceVoteC2S, TeamBalanceVoteC2S);
registerPacket(channels.S2C, packetIds.TeamBalanceStatus, TeamBalanceStatus);
registerPacket(channels.S2C, packetIds.SetItemCharges, SetItemCharges);
registerPacket(channels.S2C, packetIds.SpawnMarker, SpawnMarker);
registerPacket(channels.S2C, packetIds.UnitSetAutoAttackGroundAllowed, UnitSetAutoAttackGroundAllowed);
registerPacket(channels.S2C, packetIds.UnitSetShowAutoAttackIndicator, UnitSetShowAutoAttackIndicator);
registerPacket(channels.S2C, packetIds.AnimationUpdateTimeStep, AnimationUpdateTimeStep);
registerPacket(channels.S2C, packetIds.UnitSetSpellPARCost, UnitSetSpellPARCost);
registerPacket(channels.S2C, packetIds.UnitSetDrawPathMode, UnitSetDrawPathMode);
registerPacket(channels.C2S, packetIds.UnitSendDrawPath, UnitSendDrawPath);
registerPacket(channels.S2C, packetIds.AmmoUpdate, AmmoUpdate);
registerPacket(channels.S2C, packetIds.UnitSetCursorReticle, UnitSetCursorReticle);
registerPacket(channels.S2C, packetIds.BuffUpdateNumCounter, BuffUpdateNumCounter);
registerPacket(channels.C2S, packetIds.UndoItemReq, UndoItemReq);
registerPacket(channels.S2C, packetIds.SetUndoEnabled, SetUndoEnabled);
registerPacket(channels.S2C, packetIds.SetInventory, SetInventory);
registerPacket(channels.S2C, packetIds.ChangeMissileSpeed, ChangeMissileSpeed);
registerPacket(channels.S2C, packetIds.SetCanSurrender, SetCanSurrender);
registerPacket(channels.S2C, packetIds.UnitSetLookAt, UnitSetLookAt);
registerPacket(channels.S2C, packetIds.DestroyUnit, DestroyUnit);
registerPacket(channels.S2C, packetIds.UnitSetSpellLevelOverrides, UnitSetSpellLevelOverrides);
registerPacket(channels.S2C, packetIds.UnitSetMaxLevelOverride, UnitSetMaxLevelOverride);
registerPacket(channels.S2C, packetIds.UnitSetPARType, UnitSetPARType);
registerPacket(channels.S2C, packetIds.MoveMarker, MoveMarker);
registerPacket(channels.S2C, packetIds.ReplayOnly_MultiKillCountUpdate, ReplayOnly_MultiKillCountUpdate);
registerPacket(channels.S2C, packetIds.NeutralMinionTimerUpdate, NeutralMinionTimerUpdate);
registerPacket(channels.S2C, packetIds.UpdateDeathTimer, UpdateDeathTimer);
registerPacket(channels.S2C, packetIds.UpdateSpellToggle, UpdateSpellToggle);
registerPacket(channels.S2C, packetIds.UpdateBounceMissile, UpdateBounceMissile);
registerPacket(channels.S2C, packetIds.DebugLogGoldSources, DebugLogGoldSources);
registerPacket(channels.C2S, packetIds.CheatLogGoldSources, CheatLogGoldSources);
registerPacket(channels.S2C, packetIds.ShopItemSubstitutionSet, ShopItemSubstitutionSet);
registerPacket(channels.S2C, packetIds.ShopItemSubstitutionClear, ShopItemSubstitutionClear);
registerPacket(channels.S2C, packetIds.ResetClient, ResetClient);
registerPacket(channels.S2C, packetIds.IncrementMinionKills, IncrementMinionKills);
registerPacket(channels.S2C, packetIds.UpdateAttackSpeedCapOverrides, UpdateAttackSpeedCapOverrides);
registerPacket(channels.S2C, packetIds.NotifyContextualSituation, NotifyContextualSituation);
registerPacket(channels.S2C, packetIds.CreateMinionCamp, CreateMinionCamp);
registerPacket(channels.S2C, packetIds.SpawnTurret, SpawnTurret);
registerPacket(channels.S2C, packetIds.UpdateAscended, UpdateAscended);
registerPacket(channels.S2C, packetIds.ChangeSlotSpellData_OwnerOnly, ChangeSlotSpellData_OwnerOnly);
registerPacket(channels.S2C, packetIds.Die_MapView, Die_MapView);
registerPacket(channels.S2C, packetIds.SetInventory_MapView, SetInventory_MapView);
registerPacket(channels.S2C, packetIds.MessageToClient_MapView, MessageToClient_MapView);
registerPacket(channels.S2C, packetIds.StartSpellTargeter, StartSpellTargeter);
registerPacket(channels.S2C, packetIds.StopSpellTargeter, StopSpellTargeter);
registerPacket(channels.S2C, packetIds.CameraLock, CameraLock);
registerPacket(channels.S2C, packetIds.TeamUpdateDragonBuffCount, TeamUpdateDragonBuffCount);
registerPacket(channels.S2C, packetIds.SetFadeOut, SetFadeOut);
registerPacket(channels.S2C, packetIds.AddConeRegion, AddConeRegion);
registerPacket(channels.S2C, packetIds.UnlockAnimation, UnlockAnimation);

const packets = {
	KEY_CHECK,
	RequestJoinTeam,
	RequestReskin,
	RequestRename,
	TeamRosterUpdate,
	Chat,
	QuickChat,
	HierarchicalProfilerUpdate,
	DisplayLocalizedTutorialChatText,
	Barrack_SpawnUnit,
	SwitchNexusesToOnIdleParticles,
	TutorialAudioEventFinished,
	SetCircularMovementRestriction,
	UpdateGoldRedirectTarget,
	SynchSimTime,
	RemoveItemReq,
	ResumePacket,
	RemoveItemAns,
	Basic_Attack,
	ReplaceObjectiveText,
	CloseShop,
	Reconnect,
	UnitAddEXP,
	EndSpawn,
	SetFrequency,
	BotAI,
	QueryStatusReq,
	UpgradeSpellAns,
	Ping_Load_Info,
	ChangeSlotSpellData,
	MessageToClient,
	DisplayFloatingText,
	Basic_Attack_Pos,
	ForceDead,
	BuffUpdateCount,
	WriteNavFlags_Acc,
	BuffReplaceGroup,
	SetAutocast,
	SwapItemReq,
	Die_EventHistory,
	UnitAddGold,
	AddRegion,
	MoveRegion,
	MoveCameraToPoint,
	LineMissileHitList,
	MuteVolumeCategory,
	ServerTick,
	StopAnimation,
	AvatarInfo_Server,
	DampenerSwitchStates,
	World_SendCamera_Server_Acknologment,
	ModifyDebugCircleRadius,
	World_SendCamera_Server,
	HeroReincarnateAlive,
	BuffReplace,
	Pause,
	SetFadeOut_Pop,
	RemoveRegion,
	InstantStop_Attack,
	OnLeaveLocalVisibilityClient,
	ShowObjectiveText,
	SpawnPet,
	FX_Kill,
	UpgradeSpellReq,
	UseObject,
	MissileReplication,
	MovementDriverReplication,
	HighlightHUDElement,
	SwapItemAns,
	LevelUp,
	MapPing,
	WriteNavFlags,
	PlayEmote,
	PlaySound,
	PlayVOCommand,
	OnEventWorld,
	HeroStats,
	UpdateGameOptions,
	PlayEmoteC2S,
	PlayVOCommandC2S,
	HeroReincarnate,
	OnScoreBoardOpened,
	CreateHero,
	AddMemoryListener,
	HierarchicalMemoryUpdate,
	ToggleUIHighlight,
	FaceDirection,
	OnLeaveVisibilityClient,
	ClientReady,
	SetItem,
	SynchVersion,
	HandleTipUpdate,
	StatsUpdateReq,
	MapPingC2S,
	RemoveDebugObject,
	CreateUnitHighlight,
	DestroyClientMissile,
	SetSpellLevel,
	StartGame,
	OnShopOpened,
	Hero_Die,
	FadeOutMainSFX,
	PlayThemeMusic,
	WaypointGroup,
	StartSpawn,
	CreateNeutral,
	WaypointGroupWithSpeed,
	UnitApplyDamage,
	ModifyShield,
	PopCharacterData,
	BuffAddGroup,
	AI_TargetSelection,
	AI_Target,
	SetAnimStates,
	ChainMissileSync,
	OnTipEvent,
	ForceCreateMissile,
	BuyItemAns,
	SetSpellData,
	PauseAnimation,
	IssueOrderReq,
	CameraBehavior,
	AnimatedBuildingSetCurrentSkin,
	Connected,
	SyncSimTimeFinal,
	Waypoint_Acc,
	LockCamera,
	PlayVOAudioEvent,
	AI_Command,
	BuffRemove2,
	SpawnMinion,
	ClientCheatDetectionSignal,
	ToggleFoW,
	ToolTipVars,
	Unused128,
	World_LockCamera_Server,
	BuyItemReq,
	WaypointListHeroWithSpeed,
	SetInputLockFlag,
	SetCooldown,
	CancelTargetingReticle,
	FX_Create_Group,
	QueryStatusAns,
	Building_Die,
	PreloadCharacterData,
	RemoveListener,
	HandleQuestUpdate,
	ClientFinished,
	RemoveMemoryListener,
	Exit,
	ModifyDebugObjectColor,
	AddListener,
	World_SendGameNumber,
	World_SendGameNumberS2C,
	SetPARState,
	BuffRemoveGroup,
	Ping_Load_InfoLOW_PRIORITY,
	ChangeCharacterVoice,
	ChangeCharacterData,
	ExitS2C,
	RemoveBBProfileListener,
	CastSpellReq,
	ToggleInputLockFlag,
	SoftReconnect,
	CreateTurret,
	Die,
	UseItemAns,
	ShowAuxiliaryText,
	PausePacket,
	HideObjectiveText,
	OnEvent,
	TeamSurrenderVote,
	TeamSurrenderStatus,
	AddBBProfileListener,
	HideAuxiliaryText,
	OnReplication_Acc,
	SetGreyscaleEnabledWhenDead,
	AI_State,
	SetFoWStatus,
	ReloadScripts,
	Cheat,
	OnEnterLocalVisibilityClient,
	SendSelectedObjId,
	PlayAnimation,
	RefreshAuxiliaryText,
	SetFadeOut_Push,
	OpenTutorialPopup,
	RemoveUnitHighlight,
	CastSpellAns,
	HierarchicalBBProfileUpdate,
	BuffAdd2,
	OpenAFKWarningMessage,
	WaypointList,
	OnEnterVisibilityClient,
	AddDebugObject,
	DisableHUDForEndOfGame,
	SynchVersionC2S,
	CharSelected,
	BuffUpdateCountGroup,
	AI_TargetHero,
	SynchSimTimeS2C,
	SyncMissionStartTime,
	Neutral_Camp_Empty,
	OnReplication,
	EndOfGameEvent,
	EndGame,
	SamplingProfilerUpdate,
	PopAllCharacterData,
	TeamSurrenderVoteS2C,
	HandleUIHighlight,
	FadeMinions,
	OnTutorialPopupClosed,
	OnQuestEvent,
	ShowHealthBar,
	SpawnBot,
	SpawnLevelProp,
	UpdateLevelProp,
	AttachFlexParticle,
	HandleCapturePointUpdate,
	HandleGameScore,
	HandleRespawnPointUpdate,
	OnRespawnPointEvent,
	UnitChangeTeam,
	UnitSetMinimapIcon,
	IncrementPlayerScore,
	IncrementPlayerStat,
	ColorRemapFX,
	InteractiveMusicCommand,
	AntiBot,
	AntiBotAction,
	AntiBotC2S,
	OnEnterTeamVisibility,
	FX_OnEnterTeamVisibility,
	ReplayOnly_GoldEarned,
	CloseClient,
	SpellChargeUpdateReq,
	ModifyDebugText,
	SetDebugHidden,
	ActivateMinionCamp,
	SpectatorDataReq,
	SpectatorMetaData,
	SpectatorDataChunkInfo,
	SpectatorDataChunk,
	ChangeMissileTarget,
	MarkOrSweepForSoftReconnect,
	SetShopEnabled,
	CreateFollowerObject,
	ReattachFollowerObject,
	PlayContextualEmote,
	PlayContextualEmoteC2S,
	SetHoverIndicatorTarget,
	SetHoverIndicatorEnabled,
	SystemMessage,
	ChangeEmitterGroup,
	UpdateRestrictedChatCount,
	TeamBalanceVote,
	TeamBalanceVoteC2S,
	TeamBalanceStatus,
	SetItemCharges,
	SpawnMarker,
	UnitSetAutoAttackGroundAllowed,
	UnitSetShowAutoAttackIndicator,
	AnimationUpdateTimeStep,
	UnitSetSpellPARCost,
	UnitSetDrawPathMode,
	UnitSendDrawPath,
	AmmoUpdate,
	UnitSetCursorReticle,
	BuffUpdateNumCounter,
	UndoItemReq,
	SetUndoEnabled,
	SetInventory,
	ChangeMissileSpeed,
	SetCanSurrender,
	UnitSetLookAt,
	DestroyUnit,
	UnitSetSpellLevelOverrides,
	UnitSetMaxLevelOverride,
	UnitSetPARType,
	MoveMarker,
	ReplayOnly_MultiKillCountUpdate,
	NeutralMinionTimerUpdate,
	UpdateDeathTimer,
	UpdateSpellToggle,
	UpdateBounceMissile,
	DebugLogGoldSources,
	CheatLogGoldSources,
	ShopItemSubstitutionSet,
	ShopItemSubstitutionClear,
	ResetClient,
	IncrementMinionKills,
	UpdateAttackSpeedCapOverrides,
	NotifyContextualSituation,
	CreateMinionCamp,
	SpawnTurret,
	UpdateAscended,
	ChangeSlotSpellData_OwnerOnly,
	Die_MapView,
	SetInventory_MapView,
	MessageToClient_MapView,
	StartSpellTargeter,
	StopSpellTargeter,
	CameraLock,
	TeamUpdateDragonBuffCount,
	SetFadeOut,
	AddConeRegion,
	UnlockAnimation,
};

export default packets;
