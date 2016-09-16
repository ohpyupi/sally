$.fn.zoozlerfy = function() {
	var today = new Date();
	var todayYear = today.getFullYear();
	var content = "Copyright &copy " + todayYear + " <span style='color:#BD091B;'>Zooz</span><span style='color:#F0592B;'>l</span><span style='color:#F59120;'>e</span><span style='color:#FAAD41;'>r</span> | " + "<a href='http://www.zoozler.com/terms' target='_blank'>Terms of services</a>";
	this.html(content);
};
