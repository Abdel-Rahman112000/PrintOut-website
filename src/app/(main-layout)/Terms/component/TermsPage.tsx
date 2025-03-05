import { Box, Stack, Typography } from "@mui/material";
import "./style.css";

function TermsPage() {
  return (
    <Stack>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Effective Date: January 1, 2025
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: 500 }}>
        Website:
        <Box sx={{ textDecoration: "underLine" }} component={"a"} href="">
          printout.solutions
        </Box>
      </Typography>
      <Stack sx={{ ml: 5 }}>
        <ul className="orderList" style={{ listStyle: "square" }}>
          <li>
            Design Check:
            <dt>
              PRINTOUT will perform a basic design check on files submitted for
              printing. However, it is the customer’s responsibility to ensure
              that all artwork and files are print-ready. We do not assume
              liability for design errors, misspellings, or incorrect
              information in the customer’s artwork.
            </dt>
          </li>
          <li>
            Color Variation:
            <dt>
              Printing results may vary slightly from the colors displayed on
              your screen or provided in a physical sample due to differences in
              color calibration, materials, and printing processes. CMYK and RGB
              are two different color models used in various contexts, and there
              can be significant differences between the colors represented in
              these models. Here’s an explanation of the key distinctions:
            </dt>
            <ol>
              <li style={{ margin: "15px 0" }}>Color Model:</li>
              <ul>
                <li style={{ fontWeight: 600 }}>
                  CMYK:
                  <dt>
                    Stands for Cyan, Magenta, Yellow, and Key (black). It is
                    primarily used in color printing and refers to the
                    subtractive color model. In CMYK, colors are created by
                    subtracting colors from white light to produce the desired
                    color.
                  </dt>
                </li>
                <li style={{ fontWeight: 600 }}>
                  RGB:
                  <dt>
                    Stands for Red, Green, and Blue. It is used in digital
                    displays, such as computer screens, TVs, and cameras, and
                    refers to the additive color model. In RGB, colors are
                    created by adding light of the three primary colors.
                  </dt>
                </li>
              </ul>
              <li style={{ margin: "15px 0" }}>Primary Colors:</li>
              <ul>
                <li style={{ fontWeight: 600 }}>
                  CMYK:
                  <dt>
                    Uses cyan, magenta, yellow, and black as its primary colors.
                  </dt>
                </li>
                <li style={{ fontWeight: 600 }}>
                  RGB:
                  <dt>Uses red, green, and blue as its primary colors.</dt>
                </li>
              </ul>
              <li style={{ margin: "15px 0" }}>Color Gamut:</li>
              <ul>
                <li style={{ fontWeight: 600 }}>
                  CMYK:
                  <dt>
                    Has a smaller color gamut compared to RGB. This means that
                    CMYK can represent a more limited range of colors,
                    especially in terms of bright and vibrant colors
                  </dt>
                </li>
                <li style={{ fontWeight: 600 }}>
                  RGB:
                  <dt>
                    Has a larger color gamut and can represent a wider range of
                    colors, including bright and highly saturated hues.
                  </dt>
                </li>
              </ul>
              <li style={{ margin: "15px 0" }}>Use Cases:</li>
              <ul>
                <li style={{ fontWeight: 600 }}>
                  CMYK:
                  <dt>
                    Used for color printing, such as brochures, posters,
                    magazines, and other printed materials. It is essential for
                    accurate color reproduction in the print industry.
                  </dt>
                </li>
                <li style={{ fontWeight: 600 }}>
                  RGB:
                  <dt>
                    Used for digital displays, including computer screens,
                    televisions, smartphones, and digital cameras. It is the
                    standard color model for electronic devices.
                  </dt>
                </li>
              </ul>
              <li style={{ margin: "15px 0" }}>Color Representation:</li>
              <ul>
                <li style={{ fontWeight: 600 }}>
                  CMYK:
                  <dt>
                    Represents colors by specifying the percentage of each ink
                    (Cyan, Magenta, Yellow, and Black) required to reproduce a
                    color.
                  </dt>
                </li>
                <li style={{ fontWeight: 600 }}>
                  RGB:
                  <dt>
                    Represents colors by specifying the intensity of each of the
                    three primary colors (Red, Green, and Blue) on a scale from
                    0 to 255.
                  </dt>
                </li>
              </ul>
              <li style={{ margin: "15px 0" }}>Conversion Challenges:</li>
              <ul>
                <li>
                  Converting colors from RGB to CMYK or vice versa can lead to
                  some color shifts or inaccuracies because the color gamuts of
                  the two models differ. Not all RGB colors can be accurately
                  reproduced in CMYK, and vice versa.
                </li>
              </ul>
            </ol>
          </li>
        </ul>
      </Stack>
      <p
        style={{
          margin: "25px 0",
          fontWeight: 200,
          fontSize: "18px",
          padding: "0px",
        }}
      >
        In summary, the key difference between CMYK and RGB is their color model
        and primary colors, which lead to variations in color representation.
        It’s important to use the appropriate color model for your specific
        needs, whether it’s for print (CMYK) or digital display (RGB), and be
        aware of potential color differences when converting between the two
        models.
      </p>
      <Stack sx={{ ml: 5 }}>
        <ul className="orderList" style={{ listStyle: "square" }}>
          <li>
            Image Quality:
            <dt>
              We recommend high-resolution images (300 DPI or higher) for best
              print quality. Low-resolution images may result in pixelation or
              reduced print quality.
            </dt>
          </li>
          <li>
            Product Assurance:
            <dt>
              PRINTOUT guarantees the quality of our products. If you receive a
              product with manufacturing defects or errors on our part, please
              contact us same day of receiving the order to arrange for a
              replacement or refund.
            </dt>
          </li>
          <li>
            Material Quality:
            <dt>
              We use high-quality materials, but certain products may have
              variations in texture or appearance due to the nature of printing
              materials.
            </dt>
          </li>
          <li>
            Time of Production:
            <dt>
              Turnaround times vary based on the product, quantity, and
              specifications. We will provide estimated delivery times upon
              order confirmation. While we make every effort to meet delivery
              deadlines, we are not responsible for delays caused by factors
              beyond our control, such as shipping delays, weather conditions,
              or technical issues.
            </dt>
          </li>
          <li>
            Payments:
            <dt>
              Payment is required at least 50% at the time of placing the order
              and the remaining 50% to be determined how it will be paid (Cash ,
              Visa , Instapay , …etc), unless otherwise agreed upon in writing.
              We accept various payment methods, including credit/debit cards
              and electronic transfers. Payment details will be provided upon
              order placement.
            </dt>
          </li>
          <li>
            Delivery:
            <dt>
              We offer delivery services throughout Egypt. Shipping fees may
              apply and will be specified at the time of ordering and place of
              delivery. Delivery times may vary depending on the destination. We
              will provide an estimated delivery date upon order confirmation.
              It is the customer’s responsibility to provide accurate delivery
              information. PRINTOUT is not responsible for delivery delays or
              issues caused by incorrect address details.
            </dt>
          </li>
          <li>
            Order Cancellation:
            <dt>
              Cancellation requests must be submitted in writing and will be
              accepted only if production has not commenced. Once production
              begins, cancellations may not be possible.
            </dt>
          </li>
          <li>
            Refund and Returns:
            <dt>
              Refunds or replacements will be considered in cases of
              manufacturing defects or errors on our part, as determined by
              PRINTOUT. Returns must be initiated within same day of receiving
              the order. Please contact our customer service team to request a
              return authorization.
            </dt>
          </li>
          <li>
            Changes to Terms and Conditions:
            <dt>
              PRINTOUT reserves the right to update or modify these terms and
              conditions at any time without prior notice. Customers are
              encouraged to review these terms before placing an order. By
              placing an order with PRINTOUT, you acknowledge that you have
              read, understood, and agreed to these terms and conditions. If you
              have any questions or concerns, please contact our customer
              service team before proceeding with your order. Your satisfaction
              is our priority, and we are committed to providing high-quality
              printing services.
            </dt>
          </li>
        </ul>
      </Stack>
    </Stack>
  );
}

export default TermsPage;
