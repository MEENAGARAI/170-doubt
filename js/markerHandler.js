AFRAME.registerComponent("marker-handler", {
    init: async function() {
        var dishes = await this.getDishes();
        this.el.addEventListener("markerFound", () => {
            var markerId = this.el.id;
            this.handleMarkerFound(dishes, markerId)
        })
        this.el.addEventListener("markerLost", () => {
            this.handleMarkerLost()
        })
    },

    handleMarkerFound: function(dishes, markerId) {
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "flex"

        var ratingButton = document.getElementById("rating-button")
        var orderButton = document.getElementById("order-button")

        ratingButton.addEventListener("click", () => {
            swal({
                icon: "warning",
                title: "rate dish",
                text: "work in progress"
            })
        })

        orderButton.addEventListener("click", () => {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "thanks for order",
                text: "your order will be served soon at your table"
            })
        })
        var dish = dishes.filter(dish => dish.id === markerId)[0];

        var model = document.querySelector(`#model-${dish.id}`);
        model.setAttribute("position", dish.model_geometry.position);
        model.setAttribute("rotation", dish.model_geometry.rotation);
        model.setAttribute("scale", dish.model_geometry.scale);
    },
    handleMarkerLost: function() {
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "none"
    },
    getDishes: async function() {
        return await firebase
            .firestore()
            .collection("dishes")
            .get()
            .then(snap => {
                return snap.docs.map(doc => doc.data());
            });
    }
})