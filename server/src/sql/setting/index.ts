// 获取页面组件布局情况
const selectPageLayoutSql = `
  select * from component where pageKey = ?
`

// 获取页面组件样式情况
const selectPageStyleSql = `
  select * from styles where pageKey = ? and componentKey = ?
`

export{};
module.exports = {
	selectPageLayoutSql,
  selectPageStyleSql
}