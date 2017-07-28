import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants'; // 由于 components 和 services 中都用到了 pageSize，所以提取到 src/constants.js
import UserModal from './UserModal';

// page表示当前页
function Users({ dispatch, list: dataSource, loading, total, page: current }) {
	function deleteHandler(id) {
		console.warn(`TODO: ${id}`);
		dispatch({
			type: 'users/remove',
			payload: id
		});
	}

	function pageChangeHandler(page) {
		// 切换路由，由于之前监听了路由变化，后续会自动处理
		dispatch(routerRedux.push({
			path: '/users',
			query: { page } // 此时page已经是新的
		}));
	}

	function editHandler(id, values) {
		dispatch({
			type: 'users/patch',
			payload: { id, values }
		});
	}

	function createHandler(values) {
		dispatch({
			type: 'users/create',
			payload: values
		});
	}

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="">{text}</a>
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Website',
			dataIndex: 'website',
			key: 'website'
		},
		{
			title: 'Operation',
			key: 'operation',
			render: (text, record) => (
				<span className={styles.operation}>
					<UserModal record={record} onOk={editHandler.bind(null, record.id)}>
		              <a>Edit</a>
		            </UserModal>
					<Popconfirm title="Confirm to here?" onConfirm={deleteHandler.bind(null, record.id)}>
					<a href="">Delete</a>
					</Popconfirm>
				</span>
			)
		}
	];

	return (
	    <div className={styles.normal}>
	  		<div>
	  			<div className={styles.create}>
					<UserModel record={{}} onOK={createHandler}>
						<Button type="primary">Create User</Button>
					</UserModel>
	  			</div>
	  			<Table
	  				columns={columns}
	  				dataSource={dataSource}
	  				loading={loading}
	  				rowKey={record => record.id}
	  				pagination={false}
	  			/>
	  			<Pagination
	  				className="ant-table-pagination"
	  				total={total}
	  				current={current}
	  				pageSize={PAGE_SIZE}
	  				onChange={pageChangeHandler}
	  			/>
	  		</div>    
	    </div>
	);
}

function mapStateToProps(state) {
	const { list, total, page } = state.users;
	return {
		loading: state.loading.models.users,
		list,
		total,
		page
	};
}

export default connect(mapStateToProps)(Users);
