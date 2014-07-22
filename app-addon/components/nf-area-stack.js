import Ember from 'ember';

/**
 * A component for grouping and stacking `nf-area` components in an `nf-graph`.
 * 
 * This component looks at the order of the `nf-area` components underneath it 
 * and uses the ydata of the next sibling `nf-area` component to determine the bottom 
 * of each `nf-area` components path to be drawn.
 *
 * ### Example
 *
 *  		{{#nf-graph width=300 height=100}}
 *  			{{#nf-graph-content}}
 *  				{{#nf-area-stack}}
 *  					{{nf-area data=myData xprop="time" yprop="high"}}
 *  					{{nf-area data=myData xprop="time" yprop="med"}}
 *  					{{nf-area data=myData xprop="time" yprop="low"}}
 *  				{{/nf-area-stack}}
 *  			{{/nf-graph-content}}
 *  		{{/nf-graph}}
 *
 * @namespace components
 * @class nf-area-stack 
 */
export default Ember.Component.extend({
	tagName: 'g',

	/**
	 * Used by `nf-area` to identify an area stack parent
	 * @property isAreaStack
	 * @type Boolean
	 * @default true
	 * @readonly
	 */
	isAreaStack: true,

	/**
	 * The collection of `nf-area` components under this stack.
	 * @property areas
	 * @type Array
	 * @readonly
	 */
	areas: function(){
		return [];
	}.property(),

	/**
	 * Registers an area component with this stack. Also links areas to one
	 * another by setting `nextArea` on each area component.
	 * @function registerArea
	 * @param area {Ember.Component} The area component to register.
	 */
	registerArea: function(area) {
		var areas = this.get('areas');
		var last = areas[areas.length - 1];
		if(last) {
			last.set('nextArea', area);
			this.set('prevArea', last);
		}
		
		areas.pushObject(area);
	},

	/**
	 * Unregisters an area component from this stack. Also updates next
	 * and previous links.
	 * @function unregisterArea
	 * @param area {Ember.Component} the area to unregister
	 */
	unregisterArea: function(area) {
		var prev = area.get('prevArea');
		var next = area.get('nextArea');

		prev.set('nextArea', next);
		next.set('prevArea', prev);

		this.get('areas').removeObject(area);
	},
});