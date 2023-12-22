
import KEY_CHECK from './HANDSHAKE/0x00-KEY_CHECK';
import RequestJoinTeam from './LOADING_SCREEN/0x64-RequestJoinTeam';
import RequestReskin from './LOADING_SCREEN/0x65-RequestReskin';
import RequestRename from './LOADING_SCREEN/0x66-RequestRename';
import TeamRosterUpdate from './LOADING_SCREEN/0x67-TeamRosterUpdate';
import Chat from './COMMUNICATION/0x68-Chat';
import QuickChat from './COMMUNICATION/0x69-QuickChat';
import HierarchicalProfilerUpdate from './HANDSHAKE/0x01-HierarchicalProfilerUpdate';
import DisplayLocalizedTutorialChatText from './S2C/0x02-DisplayLocalizedTutorialChatText';
import Barrack_SpawnUnit from './S2C/0x03-Barrack_SpawnUnit';
import SwitchNexusesToOnIdleParticles from './S2C/0x04-SwitchNexusesToOnIdleParticles';
import TutorialAudioEventFinished from './C2S/0x05-TutorialAudioEventFinished';
import SetCircularMovementRestriction from './S2C/0x06-SetCircularMovementRestriction';
import UpdateGoldRedirectTarget from './S2C/0x07-UpdateGoldRedirectTarget';
import SynchSimTime from './GAMEPLAY/0x08-SynchSimTime';
import RemoveItemReq from './C2S/0x09-RemoveItemReq';
import ResumePacket from './C2S/0x0A-ResumePacket';
import RemoveItemAns from './S2C/0x0B-RemoveItemAns';
import Basic_Attack from './S2C/0x0C-Basic_Attack';
import ReplaceObjectiveText from './S2C/0x0D-ReplaceObjectiveText';
import CloseShop from './S2C/0x0E-CloseShop';
import Reconnect from './S2C/0x0F-Reconnect';
import UnitAddEXP from './S2C/0x10-UnitAddEXP';
import EndSpawn from './S2C/0x11-EndSpawn';
import SetFrequency from './S2C/0x12-SetFrequency';
import BotAI from './S2C/0x13-BotAI';
import QueryStatusReq from './C2S/0x14-QueryStatusReq';
import UpgradeSpellAns from './S2C/0x15-UpgradeSpellAns';
import Ping_Load_Info from './C2S/0x16-Ping_Load_Info';
import ChangeSlotSpellData from './S2C/0x17-ChangeSlotSpellData';
import MessageToClient from './S2C/0x18-MessageToClient';
import DisplayFloatingText from './S2C/0x19-DisplayFloatingText';
import Basic_Attack_Pos from './S2C/0x1A-Basic_Attack_Pos';
import ForceDead from './S2C/0x1B-ForceDead';
import BuffUpdateCount from './S2C/0x1C-BuffUpdateCount';
import WriteNavFlags_Acc from './C2S/0x1D-WriteNavFlags_Acc';
import BuffReplaceGroup from './S2C/0x1E-BuffReplaceGroup';
import SetAutocast from './S2C/0x1F-SetAutocast';
import SwapItemReq from './C2S/0x20-SwapItemReq';
import Die_EventHistory from './S2C/0x21-Die_EventHistory';
import UnitAddGold from './S2C/0x22-UnitAddGold';
import AddRegion from './S2C/0x23-AddRegion';
import MoveRegion from './S2C/0x24-MoveRegion';
import MoveCameraToPoint from './S2C/0x25-MoveCameraToPoint';
import LineMissileHitList from './S2C/0x26-LineMissileHitList';
import MuteVolumeCategory from './S2C/0x27-MuteVolumeCategory';
import ServerTick from './S2C/0x28-ServerTick';
import StopAnimation from './S2C/0x29-StopAnimation';
import AvatarInfo_Server from './S2C/0x2A-AvatarInfo_Server';
import DampenerSwitchStates from './S2C/0x2B-DampenerSwitchStates';
import World_SendCamera_Server_Acknologment from './S2C/0x2C-World_SendCamera_Server_Acknologment';
import ModifyDebugCircleRadius from './S2C/0x2D-ModifyDebugCircleRadius';
import World_SendCamera_Server from './C2S/0x2E-World_SendCamera_Server';
import HeroReincarnateAlive from './S2C/0x2F-HeroReincarnateAlive';
import BuffReplace from './S2C/0x30-BuffReplace';
import Pause from './S2C/0x31-Pause';
import SetFadeOut_Pop from './S2C/0x32-SetFadeOut_Pop';
import RemoveRegion from './S2C/0x33-RemoveRegion';
import InstantStop_Attack from './S2C/0x34-InstantStop_Attack';
import OnLeaveLocalVisibilityClient from './S2C/0x35-OnLeaveLocalVisibilityClient';
import ShowObjectiveText from './S2C/0x36-ShowObjectiveText';
import SpawnPet from './S2C/0x37-SpawnPet';
import FX_Kill from './S2C/0x38-FX_Kill';
import UpgradeSpellReq from './C2S/0x39-UpgradeSpellReq';
import UseObject from './C2S/0x3A-UseObject';
import MissileReplication from './S2C/0x3B-MissileReplication';
import MovementDriverReplication from './S2C/0x3C-MovementDriverReplication';
import HighlightHUDElement from './S2C/0x3D-HighlightHUDElement';
import SwapItemAns from './S2C/0x3E-SwapItemAns';
import LevelUp from './S2C/0x3F-LevelUp';
import MapPing from './S2C/0x40-MapPing';
import WriteNavFlags from './S2C/0x41-WriteNavFlags';
import PlayEmote from './S2C/0x42-PlayEmote';
import PlaySound from './S2C/0x43-PlaySound';
import PlayVOCommand from './S2C/0x44-PlayVOCommand';
import OnEventWorld from './S2C/0x45-OnEventWorld';
import HeroStats from './S2C/0x46-HeroStats';
import UpdateGameOptions from './C2S/0x47-UpdateGameOptions';
import PlayEmoteC2S from './C2S/0x48-PlayEmote';
import PlayVOCommandC2S from './C2S/0x49-PlayVOCommand';
import HeroReincarnate from './S2C/0x4A-HeroReincarnate';
import OnScoreBoardOpened from './C2S/0x4B-OnScoreBoardOpened';
import CreateHero from './S2C/0x4C-CreateHero';
import AddMemoryListener from './HANDSHAKE/0x4D-AddMemoryListener';
import HierarchicalMemoryUpdate from './HANDSHAKE/0x4E-HierarchicalMemoryUpdate';
import ToggleUIHighlight from './S2C/0x4F-ToggleUIHighlight';
import FaceDirection from './S2C/0x50-FaceDirection';
import OnLeaveVisibilityClient from './S2C/0x51-OnLeaveVisibilityClient';
import ClientReady from './C2S/0x52-ClientReady';
import SetItem from './S2C/0x53-SetItem';
import SynchVersion from './S2C/0x54-SynchVersion';
import HandleTipUpdate from './S2C/0x55-HandleTipUpdate';
import StatsUpdateReq from './C2S/0x56-StatsUpdateReq';
import MapPingC2S from './C2S/0x57-MapPing';
import RemoveDebugObject from './S2C/0x58-RemoveDebugObject';
import CreateUnitHighlight from './S2C/0x59-CreateUnitHighlight';
import DestroyClientMissile from './S2C/0x5A-DestroyClientMissile';
import SetSpellLevel from './S2C/0x5B-SetSpellLevel';
import StartGame from './S2C/0x5C-StartGame';
import OnShopOpened from './C2S/0x5D-OnShopOpened';
import Hero_Die from './S2C/0x5E-Hero_Die';
import FadeOutMainSFX from './S2C/0x5F-FadeOutMainSFX';
import PlayThemeMusic from './S2C/0x60-PlayThemeMusic';
import WaypointGroup from './LOW_PRIORITY/0x61-WaypointGroup';
import StartSpawn from './S2C/0x62-StartSpawn';
import CreateNeutral from './S2C/0x63-CreateNeutral';
import WaypointGroupWithSpeed from './S2C/0x64-WaypointGroupWithSpeed';
import UnitApplyDamage from './S2C/0x65-UnitApplyDamage';
import ModifyShield from './S2C/0x66-ModifyShield';
import PopCharacterData from './S2C/0x67-PopCharacterData';
import BuffAddGroup from './S2C/0x68-BuffAddGroup';
import AI_TargetSelection from './S2C/0x69-AI_TargetSelection';
import AI_Target from './S2C/0x6A-AI_Target';
import SetAnimStates from './S2C/0x6B-SetAnimStates';
import ChainMissileSync from './S2C/0x6C-ChainMissileSync';
import OnTipEvent from './C2S/0x6D-OnTipEvent';
import ForceCreateMissile from './S2C/0x6E-ForceCreateMissile';
import BuyItemAns from './S2C/0x6F-BuyItemAns';
import SetSpellData from './S2C/0x70-SetSpellData';
import PauseAnimation from './S2C/0x71-PauseAnimation';
import IssueOrderReq from './C2S/0x72-IssueOrderReq';
import CameraBehavior from './S2C/0x73-CameraBehavior';
import AnimatedBuildingSetCurrentSkin from './S2C/0x74-AnimatedBuildingSetCurrentSkin';
import Connected from './S2C/0x75-Connected';
import SyncSimTimeFinal from './GAMEPLAY/0x76-SyncSimTimeFinal';
import Waypoint_Acc from './C2S/0x77-Waypoint_Acc';
import LockCamera from './S2C/0x78-LockCamera';
import PlayVOAudioEvent from './S2C/0x79-PlayVOAudioEvent';
import AI_Command from './C2S/0x7A-AI_Command';
import BuffRemove2 from './S2C/0x7B-BuffRemove2';
import SpawnMinion from './S2C/0x7C-SpawnMinion';
import ClientCheatDetectionSignal from './C2S/0x7D-ClientCheatDetectionSignal';
import ToggleFoW from './S2C/0x7E-ToggleFoW';
import ToolTipVars from './S2C/0x7F-ToolTipVars';
import Unused128 from './S2C/0x80-Unused128';
import World_LockCamera_Server from './C2S/0x81-World_LockCamera_Server';
import BuyItemReq from './C2S/0x82-BuyItemReq';
import WaypointListHeroWithSpeed from './S2C/0x83-WaypointListHeroWithSpeed';
import SetInputLockFlag from './S2C/0x84-SetInputLockFlag';
import SetCooldown from './S2C/0x85-SetCooldown';
import CancelTargetingReticle from './S2C/0x86-CancelTargetingReticle';
import FX_Create_Group from './S2C/0x87-FX_Create_Group';
import QueryStatusAns from './S2C/0x88-QueryStatusAns';
import Building_Die from './S2C/0x89-Building_Die';
import PreloadCharacterData from './S2C/0x8A-PreloadCharacterData';
import RemoveListener from './HANDSHAKE/0x8B-RemoveListener';
import HandleQuestUpdate from './S2C/0x8C-HandleQuestUpdate';
import ClientFinished from './C2S/0x8D-ClientFinished';
import RemoveMemoryListener from './HANDSHAKE/0x8E-RemoveMemoryListener';
import Exit from './C2S/0x8F-Exit';
import ModifyDebugObjectColor from './S2C/0x90-ModifyDebugObjectColor';
import AddListener from './HANDSHAKE/0x91-AddListener';
import World_SendGameNumber from './C2S/0x92-World_SendGameNumber';
import World_SendGameNumberS2C from './S2C/0x92-World_SendGameNumber';
import SetPARState from './S2C/0x93-SetPARState';
import BuffRemoveGroup from './S2C/0x94-BuffRemoveGroup';
import Ping_Load_InfoLOW_PRIORITY from './LOW_PRIORITY/0x95-Ping_Load_Info';
import ChangeCharacterVoice from './S2C/0x96-ChangeCharacterVoice';
import ChangeCharacterData from './S2C/0x97-ChangeCharacterData';
import ExitS2C from './S2C/0x98-Exit';
import RemoveBBProfileListener from './HANDSHAKE/0x99-RemoveBBProfileListener';
import CastSpellReq from './C2S/0x9A-CastSpellReq';
import ToggleInputLockFlag from './S2C/0x9B-ToggleInputLockFlag';
import SoftReconnect from './C2S/0x9C-SoftReconnect';
import CreateTurret from './S2C/0x9D-CreateTurret';
import Die from './S2C/0x9E-Die';
import UseItemAns from './S2C/0x9F-UseItemAns';
import ShowAuxiliaryText from './S2C/0xA0-ShowAuxiliaryText';
import PausePacket from './C2S/0xA1-PausePacket';
import HideObjectiveText from './S2C/0xA2-HideObjectiveText';
import OnEvent from './S2C/0xA3-OnEvent';
import TeamSurrenderVote from './C2S/0xA4-TeamSurrenderVote';
import TeamSurrenderStatus from './S2C/0xA5-TeamSurrenderStatus';
import AddBBProfileListener from './HANDSHAKE/0xA6-AddBBProfileListener';
import HideAuxiliaryText from './S2C/0xA7-HideAuxiliaryText';
import OnReplication_Acc from './C2S/0xA8-OnReplication_Acc';
import SetGreyscaleEnabledWhenDead from './S2C/0xA9-SetGreyscaleEnabledWhenDead';
import AI_State from './S2C/0xAA-AI_State';
import SetFoWStatus from './S2C/0xAB-SetFoWStatus';
import ReloadScripts from './S2C/0xAC-ReloadScripts';
import Cheat from './S2C/0xAD-Cheat';
import OnEnterLocalVisibilityClient from './S2C/0xAE-OnEnterLocalVisibilityClient';
import SendSelectedObjId from './C2S/0xAF-SendSelectedObjId';
import PlayAnimation from './S2C/0xB0-PlayAnimation';
import RefreshAuxiliaryText from './S2C/0xB1-RefreshAuxiliaryText';
import SetFadeOut_Push from './S2C/0xB2-SetFadeOut_Push';
import OpenTutorialPopup from './S2C/0xB3-OpenTutorialPopup';
import RemoveUnitHighlight from './S2C/0xB4-RemoveUnitHighlight';
import CastSpellAns from './S2C/0xB5-CastSpellAns';
import HierarchicalBBProfileUpdate from './HANDSHAKE/0xB6-HierarchicalBBProfileUpdate';
import BuffAdd2 from './S2C/0xB7-BuffAdd2';
import OpenAFKWarningMessage from './S2C/0xB8-OpenAFKWarningMessage';
import WaypointList from './S2C/0xB9-WaypointList';
import OnEnterVisibilityClient from './S2C/0xBA-OnEnterVisibilityClient';
import AddDebugObject from './S2C/0xBB-AddDebugObject';
import DisableHUDForEndOfGame from './S2C/0xBC-DisableHUDForEndOfGame';
import SynchVersionC2S from './C2S/0xBD-SynchVersion';
import CharSelected from './C2S/0xBE-CharSelected';
import BuffUpdateCountGroup from './S2C/0xBF-BuffUpdateCountGroup';
import AI_TargetHero from './S2C/0xC0-AI_TargetHero';
import SynchSimTimeS2C from './S2C/0xC1-SynchSimTime';
import SyncMissionStartTime from './S2C/0xC2-SyncMissionStartTime';
import Neutral_Camp_Empty from './S2C/0xC3-Neutral_Camp_Empty';
import OnReplication from './LOW_PRIORITY/0xC4-OnReplication';
import EndOfGameEvent from './S2C/0xC5-EndOfGameEvent';
import EndGame from './S2C/0xC6-EndGame';
import SamplingProfilerUpdate from './HANDSHAKE/0xC7-SamplingProfilerUpdate';
import PopAllCharacterData from './S2C/0xC8-PopAllCharacterData';
import TeamSurrenderVoteS2C from './S2C/0xC9-TeamSurrenderVote';
import HandleUIHighlight from './S2C/0xCA-HandleUIHighlight';
import FadeMinions from './S2C/0xCB-FadeMinions';
import OnTutorialPopupClosed from './C2S/0xCC-OnTutorialPopupClosed';
import OnQuestEvent from './C2S/0xCD-OnQuestEvent';
import ShowHealthBar from './S2C/0xCE-ShowHealthBar';
import SpawnBot from './S2C/0xCF-SpawnBot';
import SpawnLevelProp from './S2C/0xD0-SpawnLevelProp';
import UpdateLevelProp from './S2C/0xD1-UpdateLevelProp';
import AttachFlexParticle from './S2C/0xD2-AttachFlexParticle';
import HandleCapturePointUpdate from './S2C/0xD3-HandleCapturePointUpdate';
import HandleGameScore from './S2C/0xD4-HandleGameScore';
import HandleRespawnPointUpdate from './S2C/0xD5-HandleRespawnPointUpdate';
import OnRespawnPointEvent from './C2S/0xD6-OnRespawnPointEvent';
import UnitChangeTeam from './S2C/0xD7-UnitChangeTeam';
import UnitSetMinimapIcon from './S2C/0xD8-UnitSetMinimapIcon';
import IncrementPlayerScore from './S2C/0xD9-IncrementPlayerScore';
import IncrementPlayerStat from './S2C/0xDA-IncrementPlayerStat';
import ColorRemapFX from './S2C/0xDB-ColorRemapFX';
import InteractiveMusicCommand from './S2C/0xDC-InteractiveMusicCommand';
import AntiBot from './S2C/0xDD-AntiBot';
import AntiBotAction from './S2C/0xDE-AntiBotAction';
import AntiBotC2S from './C2S/0xDF-AntiBot';
import OnEnterTeamVisibility from './S2C/0xE0-OnEnterTeamVisibility';
import FX_OnEnterTeamVisibility from './S2C/0xE2-FX_OnEnterTeamVisibility';
import ReplayOnly_GoldEarned from './S2C/0xE4-ReplayOnly_GoldEarned';
import CloseClient from './S2C/0xE5-CloseClient';
import SpellChargeUpdateReq from './C2S/0xE6-SpellChargeUpdateReq';
import ModifyDebugText from './S2C/0xE7-ModifyDebugText';
import SetDebugHidden from './S2C/0xE8-SetDebugHidden';
import ActivateMinionCamp from './S2C/0xE9-ActivateMinionCamp';
import SpectatorDataReq from './C2S/0xEA-SpectatorDataReq';
import SpectatorMetaData from './S2C/0xEB-SpectatorMetaData';
import SpectatorDataChunkInfo from './S2C/0xEC-SpectatorDataChunkInfo';
import SpectatorDataChunk from './S2C/0xED-SpectatorDataChunk';
import ChangeMissileTarget from './S2C/0xEE-ChangeMissileTarget';
import MarkOrSweepForSoftReconnect from './S2C/0xEF-MarkOrSweepForSoftReconnect';
import SetShopEnabled from './S2C/0xF0-SetShopEnabled';
import CreateFollowerObject from './S2C/0xF1-CreateFollowerObject';
import ReattachFollowerObject from './S2C/0xF2-ReattachFollowerObject';
import PlayContextualEmote from './S2C/0xF3-PlayContextualEmote';
import PlayContextualEmoteC2S from './C2S/0xF4-PlayContextualEmote';
import SetHoverIndicatorTarget from './S2C/0xF5-SetHoverIndicatorTarget';
import SetHoverIndicatorEnabled from './S2C/0xF6-SetHoverIndicatorEnabled';
import SystemMessage from './S2C/0xF7-SystemMessage';
import ChangeEmitterGroup from './S2C/0xF8-ChangeEmitterGroup';
import UpdateRestrictedChatCount from './S2C/0xF9-UpdateRestrictedChatCount';
import TeamBalanceVote from './S2C/0xFA-TeamBalanceVote';
import TeamBalanceVoteC2S from './C2S/0xFB-TeamBalanceVote';
import TeamBalanceStatus from './S2C/0xFC-TeamBalanceStatus';
import SetItemCharges from './S2C/0xFD-SetItemCharges';
import SpawnMarker from './S2C/0x0100-SpawnMarker';
import UnitSetAutoAttackGroundAllowed from './S2C/0x0101-UnitSetAutoAttackGroundAllowed';
import UnitSetShowAutoAttackIndicator from './S2C/0x0102-UnitSetShowAutoAttackIndicator';
import AnimationUpdateTimeStep from './S2C/0x0103-AnimationUpdateTimeStep';
import UnitSetSpellPARCost from './S2C/0x0104-UnitSetSpellPARCost';
import UnitSetDrawPathMode from './S2C/0x0105-UnitSetDrawPathMode';
import UnitSendDrawPath from './C2S/0x0106-UnitSendDrawPath';
import AmmoUpdate from './S2C/0x0107-AmmoUpdate';
import UnitSetCursorReticle from './S2C/0x0108-UnitSetCursorReticle';
import BuffUpdateNumCounter from './S2C/0x0109-BuffUpdateNumCounter';
import UndoItemReq from './C2S/0x010A-UndoItemReq';
import SetUndoEnabled from './S2C/0x010B-SetUndoEnabled';
import SetInventory from './S2C/0x010C-SetInventory';
import ChangeMissileSpeed from './S2C/0x010D-ChangeMissileSpeed';
import SetCanSurrender from './S2C/0x010E-SetCanSurrender';
import UnitSetLookAt from './S2C/0x010F-UnitSetLookAt';
import DestroyUnit from './S2C/0x0110-DestroyUnit';
import UnitSetSpellLevelOverrides from './S2C/0x0111-UnitSetSpellLevelOverrides';
import UnitSetMaxLevelOverride from './S2C/0x0112-UnitSetMaxLevelOverride';
import UnitSetPARType from './S2C/0x0113-UnitSetPARType';
import MoveMarker from './S2C/0x0114-MoveMarker';
import ReplayOnly_MultiKillCountUpdate from './S2C/0x0115-ReplayOnly_MultiKillCountUpdate';
import NeutralMinionTimerUpdate from './S2C/0x0116-NeutralMinionTimerUpdate';
import UpdateDeathTimer from './S2C/0x0117-UpdateDeathTimer';
import UpdateSpellToggle from './S2C/0x0118-UpdateSpellToggle';
import UpdateBounceMissile from './S2C/0x0119-UpdateBounceMissile';
import DebugLogGoldSources from './S2C/0x011A-DebugLogGoldSources';
import CheatLogGoldSources from './C2S/0x011B-CheatLogGoldSources';
import ShopItemSubstitutionSet from './S2C/0x011C-ShopItemSubstitutionSet';
import ShopItemSubstitutionClear from './S2C/0x011D-ShopItemSubstitutionClear';
import ResetClient from './S2C/0x011E-ResetClient';
import IncrementMinionKills from './S2C/0x011F-IncrementMinionKills';
import UpdateAttackSpeedCapOverrides from './S2C/0x0120-UpdateAttackSpeedCapOverrides';
import NotifyContextualSituation from './S2C/0x0121-NotifyContextualSituation';
import CreateMinionCamp from './S2C/0x0122-CreateMinionCamp';
import SpawnTurret from './S2C/0x0123-SpawnTurret';
import UpdateAscended from './S2C/0x0124-UpdateAscended';
import ChangeSlotSpellData_OwnerOnly from './S2C/0x0125-ChangeSlotSpellData_OwnerOnly';
import Die_MapView from './S2C/0x0126-Die_MapView';
import SetInventory_MapView from './S2C/0x0127-SetInventory_MapView';
import MessageToClient_MapView from './S2C/0x0128-MessageToClient_MapView';
import StartSpellTargeter from './S2C/0x0129-StartSpellTargeter';
import StopSpellTargeter from './S2C/0x012A-StopSpellTargeter';
import CameraLock from './S2C/0x012B-CameraLock';
import TeamUpdateDragonBuffCount from './S2C/0x012C-TeamUpdateDragonBuffCount';
import SetFadeOut from './S2C/0x012D-SetFadeOut';
import AddConeRegion from './S2C/0x012E-AddConeRegion';
import UnlockAnimation from './S2C/0x012F-UnlockAnimation';

import registerPacket from './register';
import channels from './channels';
import packetIds from './ids';

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
