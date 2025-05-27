const Testimonials = () => {
  return (
    <div style={{ backgroundColor: "#F5EDED" }}>
      <div className="container my-5">
        <h1 className="text-center fw-bold fs-1 text-success pt-4">TESTIMONIALS</h1>
        <h2 className="text-center fs-3 mb-4">What Clients Say</h2>
        <p className="text-center mb-5">
          We place huge value on strong relationships and have seen the benefit they bring to our business.
          Customer feedback is vital in helping us to get it right.
        </p>

        {/* Testimonial Row with Framer Motion */}
        <div
          className="row text-center"
          style={{ overflow: "hidden", whiteSpace: "nowrap" }} // Ensures sliding works properly
          // animate={{ x: [300, -300] }} // Adjust x to control sliding distance
          // transition={{
          //   repeat: Infinity,
          //   duration: 12, // Total time for one full loop
          //   ease: "linear",
          // }}
        >
          {/* First Card */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <img
                  src="https://via.placeholder.com/80"
                  className="rounded-circle mb-3"
                  alt="Nat Reynolds"
                />
                <p className="card-text">
                  Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris augue neque gravida in fermentum.
                  Praesent semper feugiat nibh sed pulvinar proin.
                </p>
                <h5 className="card-title fs-4 fw-bold mt-4">Nat Reynolds</h5>
                <p className="card-subtitle text-muted">Chief Accountant</p>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <img
                  src="https://via.placeholder.com/80"
                  className="rounded-circle mb-3"
                  alt="Celia Almeda"
                />
                <p className="card-text">
                  Pharetra vel turpis nunc eget lorem. Quisque id diam vel quam elementum pulvinar etiam.
                  Urna porttitor rhoncus dolor purus non enim praesent elementum.
                </p>
                <h5 className="card-title fs-4 fw-bold mt-4">Celia Almeda</h5>
                <p className="card-subtitle text-muted">Secretary</p>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <img
                  src="https://via.placeholder.com/80"
                  className="rounded-circle mb-3"
                  alt="Bob Roberts"
                />
                <p className="card-text">
                  Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin.
                  Nibh nisi dictumst vestibulum rhoncus est pellentesque elit.
                </p>
                <h5 className="card-title fs-4 fw-bold mt-4">Bob Roberts</h5>
                <p className="card-subtitle text-muted">Sales Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
