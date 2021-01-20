import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import amortizationEntry, {
  AmortizationEntryState
} from 'app/entities/amortization-entry/amortization-entry.reducer';
// prettier-ignore
import prepaymentEntry, {
  PrepaymentEntryState
} from 'app/entities/prepayment-entry/prepayment-entry.reducer';
// prettier-ignore
import prepaymentData, {
  PrepaymentDataState
} from 'app/entities/prepayment-data/prepayment-data.reducer';
// prettier-ignore
import prepsFileType, {
  PrepsFileTypeState
} from 'app/entities/preps/preps-file-type/preps-file-type.reducer';
// prettier-ignore
import prepsFileUpload, {
  PrepsFileUploadState
} from 'app/entities/preps/preps-file-upload/preps-file-upload.reducer';
// prettier-ignore
import prepsMessageToken, {
  PrepsMessageTokenState
} from 'app/entities/preps/preps-message-token/preps-message-token.reducer';
// prettier-ignore
import compilationRequest, {
  CompilationRequestState
} from 'app/entities/compilation-request/compilation-request.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly amortizationEntry: AmortizationEntryState;
  readonly prepaymentEntry: PrepaymentEntryState;
  readonly prepaymentData: PrepaymentDataState;
  readonly prepsFileType: PrepsFileTypeState;
  readonly prepsFileUpload: PrepsFileUploadState;
  readonly prepsMessageToken: PrepsMessageTokenState;
  readonly compilationRequest: CompilationRequestState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  amortizationEntry,
  prepaymentEntry,
  prepaymentData,
  prepsFileType,
  prepsFileUpload,
  prepsMessageToken,
  compilationRequest,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
