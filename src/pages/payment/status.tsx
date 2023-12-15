import Layout from '@components/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Link from '@components/ui/link';
import axios from 'axios';

export default function PaymentStatus() {
  return (
    <>
      <Container>
        <div className="bg-gray-100 h-screen">
          <div className="bg-white p-6  md:mx-auto">
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link
                  href="/auth/signin"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  SIGN IN TO DASHBOARD
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

PaymentStatus.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  console.log(query);
  const {
    user_id,
    transaction_id,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
  } = query;

  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/payment/status`,
    {
      user_id,
      transaction_id,
      amount,
      mobile,
      purchase_order_id,
      purchase_order_name,
    },
    {
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('Data from frontend', data);
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
