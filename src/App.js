import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ fullName: "", mobile: "", age: "" });
  const [view, setView] = useState("dashboard"); // dashboard, catalog, profile

  // მზა მონაცემები (Mock Data)
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      price: 100,
      instructor: "Nika",
      category: "Development",
    },
    {
      id: 2,
      title: "UI/UX Design",
      price: 150,
      instructor: "Anna",
      category: "Design",
    },
  ];

  const handleEnroll = () => {
    if (!isLoggedIn) {
      alert("გთხოვთ გაიაროთ ავტორიზაცია!");
      return;
    }
    if (!user.fullName || !user.mobile) {
      alert("გთხოვთ შეავსოთ პროფილი!");
      setView("profile");
      return;
    }
    alert("წარმატებით ჩაეწერეთ კურსზე!");
  };

  return (
    <div className="App">
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          background: "#eee",
        }}
      >
        <b onClick={() => setView("dashboard")} style={{ cursor: "pointer" }}>
          LMS LOGO
        </b>
        <span onClick={() => setView("catalog")} style={{ cursor: "pointer" }}>
          Browse Courses
        </span>
        {!isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(true)}>Log In</button>
        ) : (
          <span
            onClick={() => setView("profile")}
            style={{ cursor: "pointer" }}
          >
            My Profile (👤)
          </span>
        )}
      </nav>

      {view === "dashboard" && (
        <section>
          <h1>Welcome to Learning Platform</h1>
          <p>Start your journey today.</p>
          <button onClick={() => setView("catalog")}>Explore Courses</button>
        </section>
      )}

      {view === "catalog" && (
        <section>
          <h2>Course Catalog</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                style={{ border: "1px solid #ccc", padding: "10px" }}
              >
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor}</p>
                <p>Price: ${course.price}</p>
                <button onClick={handleEnroll}>Enroll Now</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "profile" && (
        <section>
          <h2>My Profile</h2>
          <input
            placeholder="Full Name"
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          />
          <br />
          <input
            placeholder="Mobile (5XX XXX XXX)"
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />
          <br />
          <input
            placeholder="Age"
            type="number"
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />
          <br />
          <button
            onClick={() => {
              alert("Saved!");
              setView("catalog");
            }}
          >
            Save & Continue
          </button>
        </section>
      )}
    </div>
  );
}
