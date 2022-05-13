// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: 'shifan-7go6becgb0bf60d6' });

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  let result = await db.collection('fans').doc("1").update({
    data: {
      userlist: _.push(event.name)
    },
    success(e) {
      console.log(e)
    }
  })

  return {
    event,
    result
  }
}