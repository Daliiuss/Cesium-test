export var testbutton = document.createElement('button');
            testbutton.type = 'button';
            testbutton.className = 'cesium-button';
            testbutton.onclick = function() {
                viewer.entities.removeAll(); // clear viewer
            };
            button.textContent = 'Test button';
            document.getElementById('toolbar').appendChild(testbutton);
