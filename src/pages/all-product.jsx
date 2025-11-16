import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Col, Flex, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function AllProduct() {
  const navigate = useNavigate();

  const onSearch = async (e) => {
    if (e) {
      navigate(`/search?query=${e}`);
    }
  };
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rootCategory, setRootCategory] = useState([]);
  const [sustainableCategory, setSustainableCategory] = useState([])
  const [consumerGoods, setConsumerGoods] = useState([])
  const [packaging, setPackaging] = useState([])
  const [engineeringPlastics, setEngineeringPlastics] = useState([])
  const [buildingMaterials, setBuildingMaterials] = useState([])
  const [rawMaterials, setRawMaterials] = useState([])


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://shop-backend-five.vercel.app/Category/GetListCategory", {
          params: { lang: "en" },
        });

        setCategories(response.data);

        const root = response.data.filter(item => item.parentId === null);
        setRootCategory(root);
        const sustainableChild = response.data.filter(
          item => item.parentId === "6916e3361965a4d7a3d95466"
        );
        setSustainableCategory(sustainableChild);
        const consumerChild = response.data.filter(
          item => item.parentId === "6916e3361965a4d7a3d9546c"
        );
        setConsumerGoods(consumerChild)
        const packagingChild = response.data.filter(
          item => item.parentId === '6916e3361965a4d7a3d95476'
        )
        setPackaging(packagingChild)
        const engineeringChild = response.data.filter(
          item => item.parentId === '6916e3371965a4d7a3d9547c'
        )
        setEngineeringPlastics(engineeringChild)
        const buildingChild = response.data.filter(
          item => item.parentId === '6916e3371965a4d7a3d95488'
        )
        setBuildingMaterials(buildingChild)
        const rawChild = response.data.filter(
          item => item.parentId === '6916e3371965a4d7a3d9548e'
        )
        setRawMaterials(rawChild)
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
  }, [rootCategory]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_all_product.mp4"
              type="video/mp4"
            />
          </video>
          <div className="section-bg-overlay absolute fill"></div>
        </div>
        <div className="section-content relative">
          <div className="_4csl">
            <Row gutter={30}>
              <Col span={12} className="_9trw RemovePaddingBottom">
                <div className="_4yvp">
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <a href="/" className="item-bread">
                            Home
                          </a>
                        ),
                      },
                      {
                        title: (
                          <span className="active-bread">All Products</span>
                        ),
                      },
                    ]}
                    id="breadcrumb"
                  />
                  <h2 className="_5xfq _1kly">All Products</h2>
                  <p className="_7vyg">
                    Discover our full range of eco-friendly and high-tech
                    plastic products designed for diverse industries. Engineered
                    with precision, tailored for your needs, and committed to a
                    greener future.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="seamy-sod section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">Find What You’re Looking For</h2>
              </Col>
            </Row>
          </div>
          <div className="_9jvd">
            <Row gutter={30}>
              <Col span={24} className="_5czu RemovePaddingBottom">
                <Input.Search
                  placeholder="Input search text"
                  className="_8wts"
                  enterButton={
                    <div className="button-gradient">
                      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                      <span className="uppercase">Search</span>
                    </div>
                  }
                  onSearch={onSearch}
                />
              </Col>
            </Row>
          </div>
          <div className="_5kgp">
            <Row gutter={30}>
              <Col span={24} className="_5pqy RemovePaddingBottom">
                <Flex vertical gap={14}>
                  <div className="_4tma">KEYWORD SUGGESTION</div>
                  <Flex align="center" justify="center" gap={12} wrap="wrap">
                    <div className="_1hmm">
                      <Link to="/search?query=Food Packaging" className="_6dut">
                        Food Packaging
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="#" className="_6dut">
                        Consumer Packaging
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="#" className="_6dut">
                        Eco-Friendly Bags
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="#" className="_6dut">
                        Masterbatch Compounds
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="#" className="_6dut">
                        Plastic Resins
                      </Link>
                    </div>
                    <div className="_1hmm">
                      <Link to="#" className="_6dut">
                        Cutlery
                      </Link>
                    </div>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      {/* Main Slide */}
      <section className="dynamism-nib section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">Choose a Market</h2>
              </Col>
            </Row>
          </div>
          <div className="_0odn">
            {rootCategory.map((item, index) => (
              <div className="_3iwp" key={index}>
                <a href={`category/${item.link}`} className="_8ahh block has-hover">
                  <div className="_4rfh image-zoom">
                    <img src={item.image} className="_5mgw" />
                  </div>
                  <div className="_1blc">
                    <div className="_9wvo">{item.categoryName}</div>
                    <div className="_4jqn"> <FontAwesomeIcon icon="fa-solid fa-arrow-right" /> </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* Sustainable Products */}
      <section className="fumed-ref section">
        <div className="section-content relative">
          <div className="_1nvi">
            <Row gutter={30}>
              <Col span={24} className="_5xem">
                <p className="_5bmu">Our products</p>
                <h3 className="_7kra">Sustainable Products</h3>
              </Col>
            </Row>
          </div>
          <div className="_5tcj">
            {sustainableCategory.map((item, index) => (
              <div className="_6npx" key={index}>
                <div className="_2jjl">
                  <div className="_8ghs">
                    <a href={`category/${item.link}`} className="block">
                      <img
                        src={item.image}
                        className="_9rtu"
                      />
                    </a>
                  </div>
                  <div className="_0cac">
                    <div className="_9not">
                      <div className="_2pzh">
                        <a href={`category/${item.link}`}>{item.categoryName}</a>
                      </div>
                      <div className="_8ynm textLine-5">
                        {item.shortDesc}
                      </div>
                    </div>
                    <div className="_3qdw">
                      <a href={`category/${item.link}`} className="button button-outline-green">
                        <span>View products</span>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Consumer Goods */}
      <section className="zeros-vug section consumer-good">
        <div className="section-content relative">
          <div className="_1nvi">
            <Row gutter={30}>
              <Col span={24} className="_5xem">
                <p className="_5bmu">Our products</p>
                <h3 className="_7kra">Consumer Goods</h3>
              </Col>
            </Row>
          </div>
          <div className="_5msj">
            {consumerGoods.map((item, index) => (
              <div className="_4euo" key={index}>
                <div className="_8aey">
                  <a href={`category/${item.link}`} className="block">
                    <img
                      src={item.image}
                      className="_1qlp"
                    />
                  </a>
                </div>
                <div className="_3pxh">
                  <div className="_0cvj">
                    <a href={`category/${item.link}`} className="textLine-1">
                      {item.categoryName}
                    </a>
                  </div>
                  <div className="_8gbl textLine-2">
                    {item.shortDesc}
                  </div>
                  <div className="_4jqn">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Packaging */}
      <section className="fumed-ref section">
        <div className="section-content relative">
          <div className="_1nvi">
            <Row gutter={30}>
              <Col span={24} className="_5xem">
                <p className="_5bmu">Our products</p>
                <h3 className="_7kra">Packaging</h3>
              </Col>
            </Row>
          </div>

          <div className="_5tcj">
            {packaging.map((item, index) => (
              <div className="_6npx" key={index}>
                <div className="_2jjl">
                  <div className="_8ghs">
                    <a href={`category/${item.link}`} className="block">
                      <img
                        src={item.image}
                        className="_9rtu"
                      />
                    </a>
                  </div>
                  <div className="_0cac">
                    <div className="_9not">
                      <div className="_2pzh">
                        <a href={`category/${item.link}`}>{item.categoryName}</a>
                      </div>
                      <div className="_8ynm textLine-5">
                        {item.shortDesc}
                      </div>
                    </div>
                    <div className="_3qdw">
                      <a href={`category/${item.link}`} className="button button-outline-green">
                        <span>View products</span>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Engineering Plastics */}
      <section className="zeros-vug section engineering-plastics">
        <div className="section-content relative">
          <div className="_1nvi">
            <Row gutter={30}>
              <Col span={24} className="_5xem">
                <p className="_5bmu">Our products</p>
                <h3 className="_7kra">Engineering Plastics</h3>
              </Col>
            </Row>
          </div>
          <div className="_5msj">
            {engineeringPlastics.map((item, index) => (
              <div className="_4euo" key={index}>
                <div className="_8aey">
                  <a href={`category/${item.link}`} className="block">
                    <img
                      src={item.image}
                      className="_1qlp"
                    />
                  </a>
                </div>
                <div className="_3pxh">
                  <div className="_0cvj">
                    <a href={`category/${item.link}`} className="textLine-2">
                      {item.categoryName}
                    </a>
                  </div>
                  <div className="_8gbl textLine-2">
                    {item.shortDesc}
                  </div>
                  <div className="_4jqn">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Building Materials */}
      <section className="fumed-ref section">
        <div className="section-content relative">
          <div className="_1nvi">
            <Row gutter={30}>
              <Col span={24} className="_5xem">
                <p className="_5bmu">Our products</p>
                <h3 className="_7kra">Building Materials</h3>
              </Col>
            </Row>
          </div>
          <div className="_5tcj">
            {buildingMaterials.map((item, index) => (
              <div className="_6npx" key={index}>
                <div className="_2jjl">
                  <div className="_8ghs">
                    <a href={`category/${item.link}`} className="block">
                      <img
                        src={item.image}
                        className="_9rtu"
                      />
                    </a>
                  </div>
                  <div className="_0cac">
                    <div className="_9not">
                      <div className="_2pzh">
                        <a href={`category/${item.link}`}>{item.categoryName}</a>
                      </div>
                      <div className="_8ynm textLine-5">
                        {item.shortDesc}
                      </div>
                    </div>
                    <div className="_3qdw">
                      <a href={`category/${item.link}`} className="button button-outline-green">
                        <span>View products</span>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Raw Materials */}
      <section className="zeros-vug section engineering-plastics">
        <div className="section-content relative">
          <div className="_1nvi">
            <Row gutter={30}>
              <Col span={24} className="_5xem">
                <p className="_5bmu uppercase">Our products</p>
                <h3 className="_7kra">Raw Materials</h3>
              </Col>
            </Row>
          </div>
          <div className="_5msj">
            {rawMaterials.map((item, index) => (
              <div className="_4euo" key={index}>
                <div className="_8aey">
                  <a href={`category/${item.link}`} className="block">
                    <img src={item.image} className="_1qlp" />
                  </a>
                </div>
                <div className="_3pxh">
                  <div className="_0cvj">
                    <a href={`category/${item.link}`} className="textLine-2">
                      {item.categoryName}
                    </a>
                  </div>
                  <div className="_8gbl textLine-2">
                    {item.shortDesc}
                  </div>
                  <div className="_4jqn">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pitched-nap section">
        <div className="section-content relative">
          <div className="_4zut">
            <Row gutter={30}>
              <Col span={24} className="_9msw">
                <h2 className="title-home">
                  Explore Our Comprehensive Catalogs
                </h2>
              </Col>
            </Row>
          </div>
          <div className="_7tfg">
            <Row gutter={30}>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_1.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 01</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_2.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 02</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_3.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 03</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_4.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 04</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_5.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 05</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
              <Col span={4} className="_5zla">
                <a className="_2rff block" href="#">
                  <div className="_4jot">
                    <img src="/images/website/pdf_6.png" className="_8opl" />
                  </div>
                  <div className="_9xqi">
                    <div className="_5vsn">
                      <div className="_5mdp textLine-1">Catalog name 06</div>
                      <div className="_2mjl textLine-1">
                        Item no: 0142711100
                      </div>
                    </div>
                    <div className="_3hml">
                      <img src="/images/icon_pdf.png" className="_4vua" />
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllProduct;
