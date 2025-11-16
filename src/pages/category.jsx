import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Slider,
} from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function Category() {
  const { slug } = useParams();
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [category,setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [rootCategory, setRootCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [typeOf, setTypeOf] = useState([]);

  const onValuesChange = (changedValues, allValues) => {
    const hasValue = Object.values(allValues).some((value) => value);
    setSubmitDisabled(!hasValue);
  };
  const onFilter = async (values) => {
    const hasValue = Object.values(values).some(
      (v) => v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : true)
    );
    if (!hasValue) {
      console.log("No filter values provided");
      return;
    }
    let filters = {};
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        filters[key] = values[key];
      }
    });

    try {
      if (filters.width) filters.width = JSON.stringify(filters.width);
      if (filters.length) filters.length = JSON.stringify(filters.length);

      const response = await axios.get(
        "https://shop-backend-five.vercel.app/Product/GetProductByFilters",
        { params: filters }
      );
      console.log(filters);

      setProducts(response.data.items);
      setCategory(null);

    } catch (err) {
      console.error("Error fetching filtered products:", err);
      setError("Không thể tải sản phẩm");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(
          "https://shop-backend-five.vercel.app/Category/GetListCategory",
          { params: { lang: "en" } }
        );

        setCategories(catRes.data);
        const root = catRes.data.filter((item) => item.parentId === null);
        setRootCategory(root);

        let categoryId = null;
        if (slug) {
          const category = catRes.data.find((c) => c.link === slug);
          setCategory(category);
          
          if (category) categoryId = category._id;
        }

        const prodRes = await axios.get(
          "https://shop-backend-five.vercel.app/Product/GetProductByCategorySlug",
          {
            params: slug ? { slug } : {}
          }
        );

        setProducts(prodRes.data.items);

        const typeOfRes = await axios.get("https://shop-backend-five.vercel.app/TypeOf/list")
        setTypeOf(typeOfRes.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);
  useEffect(() => {
    console.log(rootCategory);
    console.log(products);
  }, [rootCategory]);

  const clearFilters = () => {
    form.resetFields();
    setFilterData();
    setSubmitDisabled(true);
  };

  return (
    <div id="content" className="content-area">
      <section className="heath-lek section">
        <div className="section-bg fill">
          <div className="video-overlay no-click fill"></div>
          <video
            className="video-bg fill"
            preload="true"
            playsInline
            autoPlay
            muted
            loop
          >
            <source
              src="images/website/video_category_product.mp4"
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
                          <Link to="/all-product" className="item-bread">
                            All Products
                          </Link>
                        ),
                      },
                      {
                        title: <span className="active-bread">Packaging</span>,
                      },
                    ]}
                    id="breadcrumb"
                  />

                  <h2 className="_5xfq _1kly">Packaging</h2>
                  <div className="_7vyg">
                    <p>
                      All our products are under absolute supervision, from raw
                      materials to finished products.
                    </p>
                    <p>
                      We apply an international quality management system to all
                      of our products.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="penury-gym section">
        <div className="section-content relative">
          <div className="category-page-row">
            <Row gutter={30}>
              <Col span={6}>
                <div className="product_sidebar_cate">
                  <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={onValuesChange}
                    onFinish={onFilter}
                  >
                    <div className="_4get">
                      <div className="_4yee">
                        <div className="_5tyu">Filters</div>
                        <div className="_2wzq">
                          <Button
                            type="link"
                            size="small"
                            id="clear-filter"
                            onClick={clearFilters}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                      <Form.Item name="textSearch" className="_7pia">
                        <Input
                          placeholder="Search Products"
                          className="_8jji"
                          suffix={<SearchOutlined />}
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Categories"
                      name="categories"
                      className="widget_product_categories"
                    >
                      <Checkbox.Group className="form-group">
                        {rootCategory.map((category) => (
                          <Checkbox key={category.id} value={category.id}>
                            {category.categoryName}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Type of"
                      className="widget_product_categories"
                      name="typeOf"
                    >
                      <Checkbox.Group className="form-group">
                        {typeOf.map((type) => (
                          <Checkbox key={type._id} value={type.value}>
                            {type.name}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                      label="Width (cm)"
                      className="widget_product_categories"
                      name='width'
                    >
                      <Slider min={10} max={60} range />
                    </Form.Item>

                    <Form.Item
                      label="Length (cm)"
                      className="widget_product_categories"
                      name='length'
                    >
                      <Slider min={20} max={120} range />
                    </Form.Item>

                    <Form.Item
                      label="Recycle"
                      className="widget_product_categories"
                      name="recycle"
                    >
                      <Checkbox.Group className="form-group">
                        <Checkbox value="Yes">Yes</Checkbox>
                        <Checkbox value="No">No</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>


                    <Button type="link" htmlType="submit" className="filter">
                      Filter
                    </Button>

                  </Form>
                </div>
              </Col>

              <Col span={18}>
                <div className="_7mkr">
                  <h2 className="_3rac">{category?.categoryName ? category?.categoryName : `Searched Product`}</h2>
                </div>
                <div className="products">
                  {products.map((product) => (
                    <div className="col has-hover product" key={product._id}>
                      <div className="col-inner">
                        <div className="box-product has-hover">
                          <div className="box-image customer-box-image-product">
                            <a href={`/product/${product.slug}`} className="_1gqs block image-zoom">
                              <img
                                src={product.thumb}
                                className="_8wjh"
                              />
                            </a>
                          </div>
                          <div className="box-text box-text-products text-left">
                            <div className="title-wrapper">
                              <h4 className="product-title">
                                <a href={`/product/${product.slug}`} className="product_link">
                                  {product.prodName}
                                </a>
                              </h4>
                              <p className="sku">
                                SKU: <span>{product.sku}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  defaultCurrent={1}
                  total={27}
                  defaultPageSize={9}
                  className="pagination-cntt"
                />
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section className="lichen-gel section">
        <div className="section-content relative">
          <div className="_2gia">
            <Row gutter={60}>
              <Col span={12}>
                <div className="text-box_image">
                  <p className="_0kce">Our catalog</p>
                  <h3 className="_8mak">Explore Our Catalogs</h3>
                  <p className="_8fet">
                    Through a journey of establishment and continuous
                    development, An Phat Holdings has emerged as the leading
                    high-tech, environmentally friendly plastics group in
                    Southeast Asia. With over 20 years of experience, we are
                    dedicated to delivering high-quality, sustainable products
                    across a wide range of industries. As the region’s foremost
                    innovator in eco-friendly plastic solutions, we have built a
                    strong reputation and successfully expanded our presence
                    into key global markets, including Europe, the Americas, the
                    UAE, Japan, Korea, Singapore, Taiwan, and the Philippines.
                    Driven by ongoing research, innovation, and creativity, we
                    are committed to creating enduring value for our customers,
                    investors, and employees.
                  </p>
                  <div className="_3qdw">
                    <a className="button button-outline-green" href="/catalog">
                      <span>Our Catalogs</span>
                      <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="image-box_image">
                  <img src="/images/website/explore.png" className="_6ikc" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Category;
