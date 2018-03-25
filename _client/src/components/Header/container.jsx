import { connect } from 'react-redux';
import Header from './index';

const mapStateToProps = state => ({
	user: state.data.users.current,
	heading: state.services.page.heading
});

export default connect(mapStateToProps, null)(Header);
