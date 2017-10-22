import 'babel-polyfill';
import { lf } from './plugin/index';
import { tools } from './tools/index';

$('#form').submit(function(e) {
	e.preventDefault()
	lf.plugin.validate($(this))
})


console.log(tools)



