AFRAME.registerComponent("add-markers", {
    init: async function() {
        var scene = document.querySelector("#main-scene")
        var dishes = await this.getDishes()

        dishes.map(dish => {
            var marker = document.createElement("a-marker")
            marker.setAttribute("id", dish.id)
            marker.setAttribute("type", "pattern")
            marker.setAttribute("url", dish.marker_pattern_url)
            marker.setAttribute("cursor", { rayOrigin: "mouse" })
            marker.setAttribute("marker-handler", {})

            scene.appendChild(marker)

            var model = document.createElement("a-entity")
            model.setAttribute("id", `model-${dish.id}`)
            model.setAttribute("position", dish.model_geometry.position)
            model.setAttribute("rotation", dish.model_geometry.rotation)
            model.setAttribute("scale", dish.model_geometry.scale)
            model.setAttribute("gltf-model", `url(${dish.model_url})`)
            model.setAttribute("gesture-handler", {})

            marker.appendChild(model)

            var plane = document.createElement("a-plane")
            plane.setAttribute("id", `main-plane-${dish.id}`)
            plane.setAttribute("position", { x: 0, y: 0, z: 0 })
            plane.setAttribute("rotation", { x: -90, y: 0, z: 0 })
            plane.setAttribute("width", 1.7)
            plane.setAttribute("height", 1.5)

            marker.appendChild(plane)

            var title = document.createElement("a-plane")
            title.setAttribute("id", `title-plane-${dish.id}`)
            title.setAttribute("position", { x: 0, y: 0.89, z: 0.02 })
            title.setAttribute("rotation", { x: 0, y: 0, z: 0 })
            title.setAttribute("width", 1.69)
            title.setAttribute("height", 0.3)
            title.setAttribute("material", { color: "#f0c30f" })

            plane.appendChild(title)

            var dishTitle = document.createElement("a-entity")
            dishTitle.setAttribute("id", `dish-title-${dish.id}`)
            dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 })
            dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 })
            dishTitle.setAttribute("text", { font: "monoid", color: "black", width: 1.8, height: 1, align: "center", value: dish.dish_name.toUpperCase() })

            title.appendChild(dishTitle)

            var ingredients = document.createElement("a-entity")
            ingredients.setAttribute("id", `ingredients-${dish.id}`)
            ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 })
            ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 })
            ingredients.setAttribute("text", { font: "monoid", color: "black", width: 2, align: "left", value: `${dish.ingredients.join("\n\n")}` })

            plane.appendChild(ingredients)
        })
    },

    getDishes: async function() {
        return await firebase.firestore().collection("dishes").get().then(i => {
            return i.docs.map(doc => doc.data())
        })
    }
})