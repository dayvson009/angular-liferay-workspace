<%@ include file="/init.jsp"%>

<script type="text/javascript">
	System.import('main').then(
		(m) => {
			m.RunApplication("<portlet:namespace/>");
		}, console.error.bind(console)
	).catch(function(err){ console.error(err); });
</script>

<hello-app id="<portlet:namespace/>">Loading...</hello-app>
