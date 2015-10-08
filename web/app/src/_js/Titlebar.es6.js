export class Titlebar {
    constructor(data) {

            var model = {};
            var title = data.target.querySelector(".top-titlebar-text");
            model.title = title.innerHTML;
            // Which we then observe
            Object.observe(model, function(changes) {
                // This asynchronous callback runs
                changes.forEach(function(change) {
                    // Letting us know what changed
                    if (change.name == "title")
                        title.innerHTML = change.value || change.oldValue;
                });
            });

            data.target.querySelector("#top-titlebar-close-button").addEventListener("click", function(argument) {
                window.close();
            });
        }
        // Let's say we have a model with data


    setTitle(t) {
        model.title = t;
    }

}
