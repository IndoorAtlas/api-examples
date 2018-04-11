'use strict';

function FloorPlanView(map) {

  const app = new Vue({
    el: "#app",
    data: {
      floorplans: [],
      currentFloorPlan: null,
      currentVenue: null
    },
    methods: {
      showCurrentVenue: function() {
        $.getJSON("/venue/" + this.currentVenue, (data) => {
        // Set the state which in turn creates the floor buttons to UI
          this.floorplans = data.floorPlans.sort((a, b) => a.floorNumber >= b.floorNumber);

          // Show the first floor we have
          if (data.floorPlans.length > 0) {
            app.viewFloorPlan(data.floorPlans[0]);
            zoomTo(data.floorPlans[0].image);
          }
        });
      },
      viewFloorPlan: function(floorPlan) {
        if (this.currentFloorPlan) {
          map.removeLayer(this.currentFloorPlan.id);
          map.removeSource(this.currentFloorPlan.id);
        }
        this.currentFloorPlan = floorPlan;
        map.addLayer({
          type: 'raster',
          id: floorPlan.id,
          source: {
            type: 'image',
            url: floorPlan.image.url,
            coordinates: [
              floorPlan.image.topLeft,
              floorPlan.image.topRight,
              floorPlan.image.bottomRight,
              floorPlan.image.bottomLeft
            ].map(toLngLat)
          }
        });
      }
    }
  });

  const zoomTo = (floorPlanImage) => {
    map.flyTo({
      center: toLngLat(floorPlanImage.center),
      zoom: 18,
      speed: 2
    });
  }

  const toLngLat = (c) => [c.lon, c.lat];
}
