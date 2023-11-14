import ContentWrapper from '@/components/ContentWrapper/ContentWrapper.jsx';
import { useEffect, useState } from 'react';
import { updateProfileEmail } from '@/services/users.services';
import { Button } from '@/components/ui/button.jsx';
import { Link, useParams } from 'react-router-dom';
import Loader from '@/components/Loader/Loader.jsx';

export default function SuccessEmailChange() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await updateProfileEmail(params.email, params.username);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })
  }, []);

  return (
    <div id='success-email-change'>
      <ContentWrapper>
        <div>
          <p className="mt-6 text-lg leading-8 text-black bg-white backdrop-blur-sm bg-opacity-90 rounded-lg overflow-hidden p-8">
            {loading && (<><Loader /> Loading...</>)}
            {error ? (<>An error has occurred: {error}</>
            ) : (
              <>Your email was updated successfully. Login to continue using our forum.
                <br />
                <br />
                <Button className="mr-5" asChild>
                  <Link to="/sign-in">Login</Link>
                </Button>
              </>)}
          </p>
        </div>
      </ContentWrapper>
    </div>
  );
}
