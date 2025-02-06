const Contact = () => {
  return (
    <>
      <div style="text-decoration:none; overflow:hidden;max-width:100%;width:500px;height:500px;">
        <div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;">
          <iframe
            title="map"
            style="height:100%;width:100%;border:0;filter: invert(90%) grayscale(1);"
            src="https://www.google.com/maps/embed/v1/place?q=Paris&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          />
        </div>
      </div>
    </>
  )
}

export default Contact
