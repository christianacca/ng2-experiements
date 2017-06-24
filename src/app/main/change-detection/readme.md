# Change detection experiments

## Observations

* `OnChanges` lifecycle hook **will fire** when it's input properties change even when component is detatched manually
* `OnChanges` lifecycle hook will only fire if the `@Input` bindings change. For object's this means a *new* object reference must be assigned
* `OnChanges` lifecycle hook **will fire** when it's input properties change even when component is detatched manually
* `OnChanges` runs as part of the change detection cycle. Implications:
	* code running in this method that changes any ancestor template expression will result in an `ExpressionChangedAfterItHasBeenCheckedError` error if that ancestor has already been checked (eg the ancestor componet has a CheckAlways change detection strategy). Such code changes might be:
		* changing a property of an object supplied as an `@Input`
		* emitting an event that causes an event handler to fire that in turn causes the result of an expression in an ancestor template to change
	* any event emitted and handled by a `OnPush` component higher in the component tree that has already betten checked or skipped change detection will not have it's view updated
* `OnPush` grand children of an `OnPush` component tree will:
	* not be checked for changes by angular unless that grandchild's component has triggered a DOM event via it's template, explicitly calls `markForCheck` or `detectChanges` (last one need verification)
	* will not receive `OnChanges` unless their immediate parent is checked
	* will not receive `DoCheck` unless their immediate parent is checked
* `CheckAlways` children and grandchildren of an `OnPush` component:
	* *will* be checked when the parent component is checked
	* will not be checked on a setTimeout (or ajax?) firing unless the `CheckAlways` component also calls explicitly calls `markForCheck`
* `OnPush` *children* of an `OnPush` component *that has been checked*:
	* will receive their `DoCheck` and `OnChanges` event (the later only when an input has changed byref)
	* if within these `DoCheck` or `OnChanges` event, these component's either directly or indirectly (eg via an event fired by a sibling component) call `markForCheck`, their template *will* be checked and updated if expressions in their template has changed
* `OnPush` *children* of an `OnPush` component *that has been checked* - an example:
	* an `OnPush` grandchild component registers a callback with a `setTimeout`. This timer callback will emit an event which will be received by the grandparent component
	* the timer callback runs, and the `OnPush` grandparent receives the event; the event callback code includes a call to `markForCheck` on the grandparent
	* angular change detection runs and reaches the grandparent view. Seeing that the grandparent is checked, on the *children* of the grandparent:
		* updates their `Input` properties and calls their `OnChanges` if any of these input change
		* calls `DoCheck
		* if these children have a `CheckAlways` cd strategy or have been marked for checking (eg they called `markForCheck` during their `DoCheck`), their children will now be checked by angular, causing these in turn to have their `Input` properties updated, etc. This carries on down the tree during the change detection sweep.
	* note:  if this `OnPush` grandparent receiving the event raised by the grandchild, does NOT call `markForCheck`, the *children* of the grandparent will not receive their `OnChanges` or `DoCheck` events
* A detatched component will respond to click events in it's template. However, changes made in these click handlers will not be reflected in view until component:
	* calls `detectChanges` OR
	* is `reattach` (thus implicitly causing `markForCheck` to be called)
* Detatched *children* of a component that has been checked:
	* will receive their `DoCheck` and `OnChanges` event (the later only when an input has changed byref)
	* this will allow them `reattach` or run `detectChanges` causing their templates to be checked
* Children of an detatched component will not receive their `DoCheck` and `OnChanges` event
* `OnPush` cd strategy can be used to avoid `ExpressionChangedAfterItHasBeenCheckedError`. However:
	* changes to template expression values that have already been checked will not be updated in the DOM until the next change detection sweep
	* changing the template expression values after they have been checked, requires another round of change detection to be scheduled. 
		* This can be done efficiently by hooking into `NgZone.onStable` event (see `TreeChangeDetectorRef` for example implementation)
		* The burden on developers can be reduced with the help of component decorators that will automatically schedule this check when `Input`(s) change (see `onChangesMarkForCheck`, `markForCheck` and `markForCheckEnabled` decorators)
	* using `OnPush` requires you to implement custom change detection code. EG:
		* observables in conjunction with `AsyncPipe`
		* custom model events that are subscribed to by components in the tree and which trigger calls to `markForCheck`
