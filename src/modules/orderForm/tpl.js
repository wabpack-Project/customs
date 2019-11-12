(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.tpl = factory();
	}
})(this, function() {
	var tpl = {
		// 订单提交
		orderForm: '<div class="wui_wrapper">\n' +
			'  <%\n' +
			'  if(data.is_drugpackage) {\n' +
			'  %>\n' +
			'  <!-- 取药方式 -->\n' +
			'  <div class="taking_goods m_b" >\n' +
			'    <%\n' +
			'    if(data.is_submit != "1") {\n' +
			'    %>\n' +
			'    <div class="tg_way">\n' +
			'      <ul class="tg_list fr">\n' +
			'        <li data-id="2">\n' +
			'          <div class="fl "><span class="iconfont iconiconfontxuanzhong4 s_select"></span></div>\n' +
			'          <div class="tg_tit">自取</div>\n' +
			'        </li>\n' +
			'        <li data-id="0">\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="tg_tit">邮寄</div>\n' +
			'        </li>\n' +
			'      </ul>\n' +
			'      <div class="tg_des">请选择取药方式：</div>\n' +
			'    </div>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'    <div class="tg_addr">\n' +
			'      <%\n' +
			'        var n, addressInfo = data.address_info;\n' +
			'        if(data.delivery_type == "2") {\n' +
			'      %>\n' +
			'      <div class="addr_info">\n' +
			'        <div class="addr_con">\n' +
			'          <p>收货地址：<%=addressInfo.address||""%></p>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'      <%\n' +
			'      } else {\n' +
			'      %>\n' +
			'      <div class="addr_info" data-id="<%=addressInfo.id||\'\'%>" >\n' +
			'        <div class="addr_con">\n' +
			'          <p>收货人：<%=addressInfo.uname||""%><span><%=addressInfo.mobile||""%></span></p>\n' +
			'          <p>收货地址：<%=addressInfo.address||""%></p>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'      <%\n' +
			'      }\n' +
			'      %>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <%\n' +
			'  }\n' +
			'  %>\n' +
			'  <!--判断是否有预约信息-->\n' +
			'  <%\n' +
			'  var recordInfo = data.record_info;\n' +
			'  console.log(JSON.stringify(recordInfo) === "{}");\n' +
			'  if(JSON.stringify(recordInfo) != "{}") {\n' +
			'  %>\n' +
			'  <!-- 预约信息 -->\n' +
			'  <div class="base_info m_b" >\n' +
			'    <div class="bf_name">预约信息</div>\n' +
			'    <div class="bf_con">\n' +
			'      <div class="bf_item">\n' +
			'        <span class="fr"><%=recordInfo.name||\'\'%></span>\n' +
			'        预约人：\n' +
			'      </div>\n' +
			'      <div class="bf_item">\n' +
			'        <span class="fr"><%=recordInfo.registration_organization_name||\'\'%></span>\n' +
			'        预约机构：\n' +
			'      </div>\n' +
			'      <div class="bf_item">\n' +
			'        <span class="fr"><%=recordInfo.registration_time_string||\'\'%> <%=recordInfo.registration_week_string||\'\'%></span>\n' +
			'        预约时间：\n' +
			'      </div>\n' +
			'      <div class="bf_item">\n' +
			'        <span class="fr"><%=recordInfo.phone||\'\'%></span>\n' +
			'        预约手机号：\n' +
			'      </div>\n' +
			'      <div class="bf_item skin1">\n' +
			'        <em>预约地点：</em>\n' +
			'        <i><%=recordInfo.registration_organization_address||\'\'%></i>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <%\n' +
			'  }\n' +
			'  %>\n' +
			'  <!-- 疫苗信息 -->\n' +
			'  <%\n' +
			'  var k, flag = false; orderPackInfo = data.item_info;\n' +
			'  for(k in orderPackInfo){\n' +
			'  var orderDetail = orderPackInfo[k],\n' +
			'    orderTit = orderDetail.key_context_Chinese + \'信息\',\n' +
			'    len = orderDetail.small_item.length;\n' +
			'  <!-- 判断是自定义药包 -->\n' +
			'  if(k == 10) {\n' +
			'    var orderTit = orderDetail.key_context_Chinese,\n' +
			'      flag = true;\n' +
			'  }\n' +
			'  var isShow = flag ? \'display:inline-block\' : \'display:none\';\n' +
			'  if(len > 0){\n' +
			'  %>\n' +
			'  <div class="order_info m_b">\n' +
			'    <div class="of_name">\n' +
			'      <span class="fr"><em>￥</em><%=orderDetail.item_price_total%></span>\n' +
			'      <%=orderTit%>\n' +
			'    </div>\n' +
			'    <ul class="of_list" >\n' +
			'      <%\n' +
			'      var d = 0, itemData = orderDetail.small_item;\n' +
			'      for(; d<len; d++){\n' +
			'        var itemInfo = itemData[d];\n' +
			'      %>\n' +
			'      <li>\n' +
			'        <div class="of_item clearfix">\n' +
			'          <span class="fr"><em>￥</em><%=itemInfo.price%></span>\n' +
			'          <%=itemInfo.key_context_Chinese%><i style="<%=isShow%>">x<%=itemInfo.num||\'\'%></i>\n' +
			'        </div>\n' +
			'      </li>\n' +
			'      <%\n' +
			'        }\n' +
			'      %>\n' +
			'    </ul>\n' +
			'  </div>\n' +
			'  <%\n' +
			'    }}\n' +
			'  %>\n' +
			'  <!-- 订单信息 -->\n' +
			'  <div class="order_info m_b">\n' +
			'    <div class="of_name">订单信息</div>\n' +
			'    <div class="of_con">\n' +
			'      <%\n' +
			'        var n, orderData = data.item_info;\n' +
			'      for(n in orderData){\n' +
			'        var orderInfo = orderData[n];\n' +
			'      %>\n' +
			'      <div class="of_item clearfix">\n' +
			'        <span class="fr"><em>￥</em><%=orderInfo.item_price_total%></span>\n' +
			'        <%=orderInfo.key_context_Chinese||""%>\n' +
			'      </div>\n' +
			'      <%\n' +
			'        }\n' +
			'      %>\n' +
			'      <%\n' +
			'      if(data.delivery_type == "0") {\n' +
			'      %>\n' +
			'      <div class="of_item clearfix" id="fare">\n' +
			'        <span class="fr"><em>￥</em><%=addressInfo.delivery_fee||""%></span>\n' +
			'        运费\n' +
			'      </div>\n' +
			'      <%\n' +
			'      }\n' +
			'      %>\n' +
			'    </div>\n' +
			'    <div class="of_total">\n' +
			'      <span class="fr"><em>￥</em><%=data.total_price||\'\'%></span>\n' +
			'      总计费用\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- 蓝卡积分 -->\n' +
			'  <div class="integral_use m_b">\n' +
			'    <!-- 积分余额 -->\n' +
			'    <div class="ig_balance clearfix">\n' +
			'      <div class="ig_recharge fr">充值</div>\n' +
			'      <div class="ig_val fr">30608.26</div>\n' +
			'      <div class="ig_name"><span class="iconfont iconjine01 fl"></span>蓝卡账户余额</div>\n' +
			'    </div>\n' +
			'    <!-- 积分操作 -->\n' +
			'    <div class="ig_opt clearfix">\n' +
			'      <div class="ig_user fr">使用</div>\n' +
			'      <div class="ig_count quantity fr">\n' +
			'        <span class="iconfont iconjian cut fr"></span>\n' +
			'        <input class="text_change fr" type="text" value="111" >\n' +
			'        <span class="iconfont iconjia1 add fr"></span>\n' +
			'      </div>\n' +
			'      <div class="ig_des">请用加减钮调整金额数</div>\n' +
			'    </div>\n' +
			'    <!-- end -->\n' +
			'  </div>\n' +
			'  <!-- FORM 提交 -->\n' +
			'  <div class="pay_form" >\n' +
			'    <form action="/pay" method="post" id="paying_form" >\n' +
			'      <!-- 签名 -->\n' +
			'      <input type="hidden" id="signature" name="signature" value="<%=data.signature||\'\'%>"/>\n' +
			'      <!-- 订单id -->\n' +
			'      <input type="hidden" id="orderid" name="orderid"  value="<%=data.orderid||\'\'%>"/>\n' +
			'      <!-- 订单号 -->\n' +
			'      <input type="hidden" id="orderno" name="orderno" value="<%=data.orderno||\'\'%>"/>\n' +
			'      <!-- Android版本-->\n' +
			'      <input type="hidden" id="android_version" name="android_app_version" value="0"/>\n' +
			'      <!-- app包名-->\n' +
			'      <input type="hidden" id="app_name" name="app_name" value=""/>\n' +
			'      <!-- 支付方式 -->\n' +
			'      <input type="hidden" id="pay_type" name="payingtype" value="alipay">\n' +
			'    </form>\n' +
			'  </div>\n' +
			'  <!-- end -->\n' +
			'</div>\n' +
			'\n' +
			'<!-- 操作按钮 -->\n' +
			'<div class="footer" >\n' +
			'  <div class="pay_sure">\n' +
			'    确认支付 <span><em>￥</em><%=data.total_price||\'\'%></span>\n' +
			'  </div>\n' +
			'</div>',
		// 新增收货地址
		addAddr: '<div class="drawer" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel  <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm  <%=data.sureBtn+\'-\'+data.hash%>">保存</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">新增收货地址</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <!-- 列表 -->\n' +
			'      <div class="fm_group" >\n' +
			'        <div class="fm_text fr"><input type="text" name="uname" id="uname" autocomplete="off" placeholder="请输入收货人姓名" ></div>\n' +
			'        <div class="fm_name">收货人</div>\n' +
			'      </div>\n' +
			'      <div class="fm_group" >\n' +
			'        <div class="fm_text fr"><input type="text" name="mobile" id="mobile" autocomplete="off" placeholder="请输入收货人手机号" ></div>\n' +
			'        <div class="fm_name">手机号</div>\n' +
			'      </div>\n' +
			'      <div class="fm_group clearfix" style="display: none" >\n' +
			'        <div class="fm_a fr" id="region11" ><span class="iconfont iconyoujiantou fr"></span><em>辽宁免费送药到您家免费送药到您家免费送药到您家免费送药到您家</em></div>\n' +
			'        <div class="fm_name">所在地区</div>\n' +
			'      </div>\n' +
			'      <div class="fm_group clearfix" >\n' +
			'        <div class="fm_a fr" id="region" ><span class="iconfont iconyoujiantou fr"></span><em><input type="text"  disabled placeholder="请选择（省/市/区）&#x200E;"></em></div>\n' +
			'        <div class="fm_name">所在地区</div>\n' +
			'      </div>\n' +
			'      <div class="fm_group" >\n' +
			'        <div class="fm_textarea">\n' +
			'          <textarea name="detail" id="detail" placeholder="请输入详细地址信息(如小区/楼号/门牌等)"></textarea>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 省市区列表
		province : '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">返回</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name" ><%=data.title%></div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <!-- 列表 -->\n' +
			'      <ul class="province_list">\n' +
			'        <%\n' +
			'        var i = 0, provinceData = data.data;\n' +
			'        for(len = provinceData.length; i<len; i++){\n' +
			'        var provinceInfo = provinceData[i];\n' +
			'        %>\n' +
			'        <li>\n' +
			'          <div class="prov_item" data-id="<%=provinceInfo.code||\'\'%>" data-name="<%=provinceInfo.name||\'\'%>">\n' +
			'            <span class="iconfont iconyoujiantou fr" ></span>\n' +
			'            <%=provinceInfo.name||\'\'%>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 收货地址列表
		addrList : '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel  <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm  <%=data.sureBtn+\'-\'+data.hash%>">新增</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">请选择邮寄地址</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <!-- 列表 -->\n' +
			'      <ul class="addr_list">\n' +
			'        <%\n' +
			'        var k = 0, addrData = data.data, len = addrData.length;\n' +
			'        for(; k<len; k++){\n' +
			'        var addrInfo = addrData[k];\n' +
			'        %>\n' +
			'        <li data-id="<%=addrInfo.id||\'\'%>" data-uid="<%=addrInfo.userid||\'\'%>" >\n' +
			'          <div class="addr_info">\n' +
			'            <div class="addr_con">\n' +
			'              <p>收货人：<%=addrInfo.uname||""%><span><%=addrInfo.mobile||""%></span></p>\n' +
			'              <p>收货地址：<%=addrInfo.address||""%></p>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 邮寄收货地址信息
		deliveryAddrInfo : '<div class="addr_info" data-id="<%=data.id||\'\'%>" >\n' +
			'  <div class="fr"><span class="iconfont iconyoujiantou "></span></div>\n' +
			'  <div class="addr_con">\n' +
			'    <p>收货人：<%=data.uname||""%><span><%=data.mobile||""%></span></p>\n' +
			'    <p>收货地址：<%=data.address||""%></p>\n' +
			'  </div>\n' +
			'</div>',
		// 自取收货地址信息
		takingSelfAddrInfo : '<div class="addr_info" data-id="<%=data.id||\'\'%>" >\n' +
			'  <div class="fr"><span class="iconfont iconyoujiantou "></span></div>\n' +
			'  <div class="addr_con">\n' +
			'    <p>收货地址：<%=data.address||""%></p>\n' +
			'  </div>\n' +
			'</div>',
		// 运费
		fareHtml : '<div class="of_item clearfix" id="fare">\n' +
			'  <span class="fr"><em>￥</em><%=data.deliver_fee||""%></span>\n' +
			'  运费\n' +
			'</div>',
		// 支付方式列表
		paymentList : '<div class="drawer" style="display: block"   data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="dw_h_name">请选择支付方式</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="pay_list">\n' +
			'        <li data-pay="wxpay">\n' +
			'          <div class="pay_con clearfix">\n' +
			'            <div class="pay_name">\n' +
			'              <span class="iconfont iconweixin fl"></span>\n' +
			'              微信支付\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li data-pay="alipay">\n' +
			'          <div class="pay_con clearfix">\n' +
			'            <div class="pay_name">\n' +
			'              <span class="iconfont iconzhifubao fl"></span>\n' +
			'              支付宝支付\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
		// 收货地址列表
		addrList1 : '',

	};
	return tpl;
});
