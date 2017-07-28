import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UsersComponents from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

function Users({ location }) {
  return (
    <MainLayout location={location}>
    	<div className={styles.normal}>
	     	<UsersComponents />
	    </div>
    </MainLayout>
  );
}

export default connect()(Users);
