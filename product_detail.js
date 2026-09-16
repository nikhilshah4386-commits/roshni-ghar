(function () {

  const oldOpenCategory = window.openCategory;

  window.openCategory = function (category, icon) {

    oldOpenCategory(category, icon);

    setTimeout(function () {

      const cards =
        document.querySelectorAll("#productList .product");

      cards.forEach(function (card, index) {

        card.onclick = function () {

          const item = products[category][index];

          showProductDetail(
            item[0],
            item[1],
            category
          );

        };

      });

    }, 50);
  };

  function showProductDetail(name, icon, category) {

    let page =
      document.getElementById("productDetailPage");

    if (!page) {

      page = document.createElement("div");

      page.id = "productDetailPage";

      page.style.cssText = `
        position:fixed;
        inset:0;
        z-index:9999;
        overflow:auto;
        background:#0f172a;
        color:white;
        padding:20px;
      `;

      document.body.appendChild(page);
    }

    page.innerHTML = `

      <div style="
        max-width:700px;
        margin:auto;
      ">

        <button
          onclick="closeProductDetail()"
          style="
            padding:12px 20px;
            border:0;
            border-radius:10px;
            background:#334155;
            color:white;
            font-size:16px;
            cursor:pointer;
          "
        >
          ← Back
        </button>

        <div style="
          margin-top:20px;
          background:#1e293b;
          border-radius:20px;
          padding:20px;
        ">

          <div style="
            height:300px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#334155;
            border-radius:15px;
            font-size:130px;
          ">
            ${icon}
          </div>

          <h1 style="
            margin-top:25px;
            font-size:28px;
          ">
            ${name}
          </h1>

          <div style="
            margin-top:10px;
            color:#94a3b8;
            font-size:16px;
          ">
            Category: ${category}
          </div>

          <div style="
            margin-top:25px;
            padding:18px;
            background:#0f172a;
            border-radius:15px;
          ">

            <h2>📋 Product Details</h2>

            <p style="margin-top:15px;">
              ✓ Premium quality product
            </p>

            <p style="margin-top:10px;">
              ✓ Suitable for home & interior
            </p>

            <p style="margin-top:10px;">
              ✓ Product specifications available
            </p>

            <p style="margin-top:10px;">
              ✓ Price available on enquiry
            </p>

          </div>

          <div style="
            margin-top:20px;
            padding:18px;
            background:#0f172a;
            border-radius:15px;
          ">

            <h2>💰 Price</h2>

            <p style="
              margin-top:10px;
              font-size:22px;
            ">
              Get Best Price
            </p>

          </div>

          <button
            onclick="enquiry('${name.replace(/'/g, "\\'")}')"
            style="
              width:100%;
              margin-top:25px;
              padding:17px;
              border:0;
              border-radius:12px;
              background:#22c55e;
              color:white;
              font-size:19px;
              font-weight:bold;
              cursor:pointer;
            "
          >
            📱 Enquire Now
          </button>

        </div>

      </div>
    `;

    page.style.display = "block";
  }

  window.closeProductDetail = function () {

    const page =
      document.getElementById("productDetailPage");

    if (page) {
      page.style.display = "none";
    }

  };

})();
