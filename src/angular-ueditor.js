'use strict';
angular.module('risent.ueditor',[]).
    directive('ueditor', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var editor = new UE.ui.Editor();
                editor.render(element[0]);

                /* handle when ngModel is assign from promise */
                var watchDog = true;
                scope.$watch(function () {
                    return ngModel.$modelValue
                }, function (modelValue) {
                    if (modelValue && watchDog && !ngModel.$dirty) {
                        editor.setContent(modelValue);
                        watchDog = false;
                    }
                })

                editor.on('contentChange', function () {
                    element.val(editor.getContent());
                    ngModel.$setViewValue(editor.getContent());
                    if (!scope.$root.$$phase)
                        scope.$apply();
                })
            }
        }
    })
