require.config({
	baseUrl:"./",
　　　　paths: {
　　　　　　"jquery": "jquery-1.8.3.min.js",
　　　　　　"commonreq": "commonreq.js"
　　　　}
});
require(["jquery","commonreq"],function(){
	// $(".payt").addClass('on');
})