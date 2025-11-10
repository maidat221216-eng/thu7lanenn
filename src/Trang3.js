import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Trang3 = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("slides")
        .select("*")
        .order("id", { ascending: true })
        .limit(3); // Lấy 3 slide đầu tiên
      if (error) console.error("Lỗi khi lấy slide:", error);
      else setSlides(data);
    };
    fetchSlides();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      {slides.length > 0 ? (
        <div style={{ width: "100%", maxWidth: 800, aspectRatio: "16/9" }}>
          <Slider {...sliderSettings}>
            {slides.map((slide) => (
              <div key={slide.id} style={{ height: "100%" }}>
                <a
                  href={slide.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", height: "100%" }}
                >
                  <img
                    src={slide.image_url}
                    alt={slide.title || "slide"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p>Đang tải slide...</p>
      )}
    </div>
  );
};

export default Trang3;
