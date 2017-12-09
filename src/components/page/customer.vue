<template>
	<div>
		<!--<v-pageTitle vtitle="EditorPage"></v-pageTitle>-->

		<h2>客户管理</h2>

		<div class="nav">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

				<el-breadcrumb-item>客户管理</el-breadcrumb-item>
			</el-breadcrumb>

		</div>

		<div class="br"></div>

		<div class="btn">

			<el-button size="medium" type="primary" @click="dialogFormVisible = true">新增</el-button>

			<!--内嵌表格-->

			<el-dialog title="新增" :visible.sync="dialogFormVisible">
				<el-form :model="form">

					<!--<el-form-item label="角色选择" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择角色">
							<el-option label="管理员" value="shanghai"></el-option>
							<el-option label="用户" value="beijing"></el-option>
						</el-select>
					</el-form-item>-->

					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="电话" :label-width="formLabelWidth">
						<el-input v-model="form.phone" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="数量" :label-width="formLabelWidth">
						<!--<el-input v-model="form.number" auto-complete="off"></el-input>-->
						<el-input-number v-model="form.orgcount" @change="handleChange" :min="0" :max="500" label="请输入"></el-input-number>
					</el-form-item>

				</el-form>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="add">确 定</el-button>
				</div>
			</el-dialog>

			<el-button size="medium" type="success" @click="open3(row)">刷新</el-button>

		</div>

		<el-table :data="tableData" style="width: 100%" class="table">

			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="name" label="客户名称" width="180"></el-table-column>
			<el-table-column prop="phone" label="电话" width="180"></el-table-column>
			<el-table-column prop="orgcount" label="机构数量">
			</el-table-column>
			<el-table-column prop="createTime" label="创建日期" width="180">
			</el-table-column>

			<el-table-column label="操作">

				<template slot-scope="scope">

					<!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>-->

					<router-link to="../organization">

						<el-button size="mini" type="warning">机构管理</el-button>

					</router-link>

					<el-button size="mini" type="primary" @click='modify(row)'>修改</el-button>

				</template>
			</el-table-column>
		</el-table>

		<div class="paging block">

			<!-- <span class="demonstration">调整每页显示条数</span>-->
			<el-pagination :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	//	import vPageTitle from '../common/pageTitle.vue';
//	import axios from 'axios';
	import api from '../../api/api.js';

	export default {

		data() {
			return {
				num1: '',
				tableData: [
					//				{
					//					date: '2016-05-02',
					//					name: ' 南京蒙特梭利幼儿园 ',
					//					telephone: '025-5201314',
					//					number: '15'
					//				}
				],
				dialogFormVisible: false,
				form: {
					name: '',
					createTime: '',
					orgcount: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					linkman: '',
					phone: ''
				},
				formLabelWidth: '120px'
			}

		},

		created() {

			this.init();

		},
		methods: {
			open6() {
				this.$confirm('此操作将永久删除该数据 , 是否继续呢?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			open3() {
				this.$notify({
					title: '成功',
					message: '刷新成功了哟，点击可关闭',
					type: 'success'
				});
			},
			handleChange(value) {
				console.log(value);
			},

			//	             获取列表数据
			init() {

				axios.get(api.apidomain + 'customer/search?n=100&p=1', {
						params: {
							type: "get",
							dataType: "json",
							contentType: "application/json"
						}
					})
					.then(response => {
						//	console.log(response);
						this.tableData = response.data.data;

					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
						alert('亲，网络错误，无法访问,请联系后台管理员');
					});
			},

			//	添加
			add() {
				axios.post('http://localhost/manager/customer', {
//						params:from
						
//						'name': "测试demo",
//						'linkman': "352048",
//						'phone': "120119188"
					})
					.then(response => {
						console.log(response);
//						console.log(123)
						alert('恭喜成功！');
					})
					.catch(error => {
						console.log(error);
						console.log('网络错误');
						alert('无法访问,无法添加');
					});
				this.dialogFormVisible = false;
				this.init();

			},
			//			add() {
			//				
			//			axios.post('http://localhost/manager/customer', {
			//				firstName: 'Fred',
			//				lastName: 'Flintstone'
			//			})
			//			.then(function(response) {
			//				console.log(response);
			//			})
			//			.catch(function(error) {
			//				console.log(error);
			//				alert('无法访问,无法添加');
			//			});
			//			
			//			},
			//          修改
			modify(customerId) {
				console.log(customerId);
				//				axios.get('http://localhost/manager/customer', {
				//						params:customerId
				//					
				//				})
				//				.then(response => {
				//					//					console.log(response);
				//					this.tableData = response.data.data;
				//					console.log(123)
				//				})
				//				.catch(error => {
				//					console.log(error);
				//					console.log('网络错误');
				//					alert('访问错误，无法修改');
				//				});
				this.dialogFormVisible = true;
				this.init();

			},

			//          删除
			//			del(){
			//				axios.post('http://localhost/manager/customer', {
			//						params:this.form
			//					
			//				})
			//				.then(response => {
			//					//					console.log(response);
			//					this.tableData = response.data.data;
			//					console.log(123)
			//				})
			//				.catch(error => {
			//					console.log(error);
			//					console.log('网络错误');
			//					alert('无法访问,请联系后台管理员');
			//				});
			//				this.dialogFormVisible = false;
			//				
			//			}
		}
	}
</script>

<style scoped>
	h2 {
		margin: 5px 0 18px 0;
	}
	
	.br {
		border: 0.5px solid #6085B0;
	}
	
	.btn {
		margin: 35px 0 15px 0;
	}
	
	.nav {
		margin-bottom: 20px;
		font-size: 30px;
	}
	
	.paging {
		margin-top: 30px;
		text-align: center;
	}
	
	.el-button+.el-button {
		margin-left: 0;
	}
</style>