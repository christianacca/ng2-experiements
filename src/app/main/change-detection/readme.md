# Change detection experiments

## Facts

* `OnChanges` lifecycle hook **will fire** when it's input properties change even when component is detatched manually
* `OnChanges` lifecycle hook will only fire if the `@Input` bindings change. For object's this means a *new* object reference must be assigned
* `OnChanges` lifecycle hook **will fire** when it's input properties change even when component is detatched manually
* `OnChanges` runs as part of the change detection cycle. Implications:
	* code running in this method that changes any ancestor template expression will result in an `ExpressionChangedAfterItHasBeenCheckedError` error if that ancestor has already been checked (eg the ancestor componet has a CheckAlways change detection strategy). Such code changes might be:
		* changing a property of an object supplied as an `@Input`
		* emitting an event that causes an event handler to fire that in turn causes the result of an expression in an ancestor template to change
	* any event emitted and handled by a `OnPush` component higher in the component tree that has already betten checked or skipped change detection will not have it's view updated
* A detatched component will respond to click events in it's template. However, changes made in these click handlers will not be reflected in view until component:
	* calls `detectChanges` OR
	* is `reattach` (thus implicitly causing `markForCheck` to be called)
* Grand children of an `OnPush` component will:
	* not be checked for changes by angular unless that grandchild's component has triggered a DOM event via it's template, explicitly calls `markForCheck` or `detectChanges` (last one need verification)
	* will not receive `OnChanges`
	* will not receive `DoCheck`
* *Direct children* of an `OnPush` component that has been checked:
	* will receive their `DoCheck` and `OnChanges` event (the later only when an input has changed byref)
	* if within these `DoCheck` and `OnChanges` these component's either directly or indirectly (via an event firing due to sibling code) then `markForCheck`, their template *will* be checked and updated if expressions in this template has changed
* Detatched *direct children* of a component that has been checked:
	* will receive their `DoCheck` and `OnChanges` event (the later only when an input has changed byref)
	* this will allow them `reattach` or run `detectChanges` causing their templates to be checked
* Children of an detatched component will not receive their `DoCheck` and `OnChanges` event