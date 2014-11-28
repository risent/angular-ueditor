'use strict';
angular.module('risent.ueditor',[]).
    directive('ueditor', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var eleId = element.attr('id');
                if (eleId == undefined) {
                    window.UEDITOR_ID_SEQ = window.UEDITOR_ID_SEQ || 0;
                    eleId = 'ueditor-' + window.UEDITOR_ID_SEQ;
                    element.attr('id', eleId);
                    window.UEDITOR_ID_SEQ += 1;
                }
                var editor = UE.getEditor(eleId);
                var watchDog = true;
                scope.$watch(function(){return ngModel.$modelValue}, function(modelValue){
                    if (modelValue && watchDog) {
                        editor.setContent(modelValue);
                        watchDog = false;
                    }
                })
                editor.on('contentChange', function() {
                    element.val(editor.getContent());
                    ngModel.$setViewValue(editor.getContent());
                })
            }
        }
    })