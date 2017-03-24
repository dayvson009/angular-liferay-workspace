package com.xtivia.portlet;

import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;

import javax.portlet.Portlet;

import org.osgi.service.component.annotations.Component;

@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.display-name=Todo Portlet",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user",
		"com.liferay.portlet.header-portlet-css=/css/todo.css",
		"com.liferay.portlet.header-portlet-javascript=/node_modules/core-js/client/shim.min.js",
		"com.liferay.portlet.header-portlet-javascript=/node_modules/systemjs/dist/system.src.js",
		"com.liferay.portlet.header-portlet-javascript=/systemjs.config.js"
	},
	service = Portlet.class
)
public class TodoPortlet extends MVCPortlet {
}
