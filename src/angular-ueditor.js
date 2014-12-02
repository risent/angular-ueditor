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
                        resizeEditor(editor, function(){
                            watchDog = false;
                        })
                    }
                })

                scope.$watch(function () {
                    return element.parent().is(':visible');
                }, function (isVisible) {
                    if (isVisible) {
                        $(editor.container).width('100%');
                        $(editor.container).find('.edui-editor-iframeholder').width('100%');

                        resizeEditor(editor);
                    }
                })

                function resizeEditor(editor, fn) {
                    editor.ready(function(){
                        if (ngModel.$modelValue) {
                            editor.setContent(ngModel.$modelValue);
                        }

                        // Set the editor min height to 260px
                        if($(editor.container).height() > 260) {
                            editor.setHeight('100%');
                        } else {
                            editor.setHeight(260);
                        }
                        if (fn) {
                            fn.call(editor);
                        }
                    })
                }

                editor.on('contentChange', function () {
                    element.val(editor.getContent());
                    ngModel.$setViewValue(editor.getContent());
                    if (!scope.$root.$$phase)
                        scope.$apply();
                })
            }
        }
    })
