import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Component from './component';

import {appSelector} from '../../../store/selectors/auth';

import {tokenLogin} from '../../../store/actions/auth';

// import {
//   redirectToLogin,
//   navToHome,
// } from '../../../store/actions/navigation';

function mapStateToProps(state, ownProps) {
  return {
    ...appSelector(state, ownProps),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // redirectToLogin,
    // navToHome,
    tokenLogin
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
