<%@ include file="/init.jsp"%>
<script type="text/javascript">
	System.import('/o/todo-portlet-1.0.0/main.js').then(
		(m) => {
			m.RunApplication("<portlet:namespace/>");
		}, console.error.bind(console)
	).catch(function(err){ console.error(err); });
</script>

<todo-app id="<portlet:namespace/>">Loading...</todo-app>

<footer class="info">
	<p>Double-click to edit a todo</p>
</footer>
