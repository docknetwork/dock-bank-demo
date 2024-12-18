import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Separator } from 'components/ui/separator';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { apiGetLocal, postRequestLocal } from 'utils/request';
import { dockUrl } from 'utils/constants';

const credential = {
  type: ['UniversityDegreeCredential'],
  context: ['https://www.w3.org/2018/credentials/examples/v1'],
  subject: {
    alumniOf: 'Dock University',
    degree: 'Credential Science',
    // name will be added by claims flow!
  },
  expirationDate: '2099-08-24T14:15:22Z',
};

const authProvider = {
  url: 'https://creds.dock.io/claims',
  scope: ['openid'],
  clientId:
    'eyAic2NoZW1hIjogImh0dHBzOi8vZG9ja25ldHdvcmsuZ2l0aHViLmlvL3ZjLXNjaGVtYXMvYmFzaWMtY3JlZGVudGlhbC5qc29uIiwgImNsYWltcyI6IFsibmFtZSJdIH0=',
  clientSecret: 'gpO2IVK+OALL8W+DcFlIfFhJtNA=',
};

const claimMap = {
  name: 'name',
};

const sphereonProofRequest = {
  name: 'SphereonID Proof Request',
  nonce: '1234567890',
  request: {
    name: 'SphereonID JWT credential request',
    purpose: 'Dock -> SphereonID interop',
    id: 'example_jwt_vc',
    input_descriptors: [
      {
        id: 'id_credential',
        constraints: {
          fields: [
            {
              path: ['$.type', '$.vc.type'],
              filter: {
                type: 'array',
                contains: {
                  const: 'SphereonWalletIdentityCredential',
                },
              },
            },
          ],
        },
      },
    ],
  },
};

const dockProofRequest = {
  name: 'Proof request',
  nonce: '1234567890',
  request: {
    name: 'OID4VP test proof request',
    purpose: 'To present a test credential on the Dock Sales Demo',
    input_descriptors: [
      {
        id: 'Dock Credential',
        name: 'OID4VP test proof request',
        purpose: 'To present a test credential on the Dock Sales Demo',
        constraints: {
          fields: [
            {
              path: ['$.credentialSubject.name'],
            },
            {
              path: ['$.type', '$.vc.type'],
              filter: {
                type: 'array',
                contains: {
                  const: 'UniversityDegreeCredential',
                },
              },
            },
          ],
        },
      },
    ],
  },
};

const ebsiConformanceProofRequest = {
  name: 'EBSI Request',
  nonce: '12338123',
  request: {
    id: 'k5j458432r8f',
    format: { jwt_vc: { alg: ['ES256'] }, jwt_vp: { alg: ['ES256'] } },
    input_descriptors: [
      {
        id: 'jkodasjd204',
        format: { jwt_vc: { alg: ['ES256'] } },
        constraints: {
          fields: [
            {
              path: ['$.vc.type'],
              filter: {
                type: 'array',
                contains: { const: 'VerifiableAttestation' },
              },
            },
          ],
        },
      },
      {
        id: 'j3i84594388',
        format: { jwt_vc: { alg: ['ES256'] } },
        constraints: {
          fields: [
            {
              path: ['$.vc.type'],
              filter: {
                type: 'array',
                contains: { const: 'VerifiableAttestation' },
              },
            },
          ],
        },
      },
      {
        id: 'h10321032c',
        format: { jwt_vc: { alg: ['ES256'] } },
        constraints: {
          fields: [
            {
              path: ['$.vc.type'],
              filter: {
                type: 'array',
                contains: { const: 'VerifiableAttestation' },
              },
            },
          ],
        },
      },
    ],
  },
};

function OID4VPProofRequest({ title, desc, proofRequestSetupObject }) {
  const [proofRequest, setProofRequest] = useState();
  const [isVerified, setIsVerified] = useState(false);

  async function createProofRequest() {
    const { data: proofRequest } = await postRequestLocal('create-proof-request-object', {
      did: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
      ...proofRequestSetupObject,
    });

    const { data: qrUrlData } = await postRequestLocal('get-oid4vp-url', {
      withRequestURI: true,
      proofRequestId: proofRequest.id,
    });

    setProofRequest({
      ...proofRequest,
      qrUrlData,
    });

    const int = setInterval(async () => {
      try {
        const { data: res } = await apiGetLocal(`handle-proof?proofID=${proofRequest.id}`);
        if (res.verified) {
          setProofRequest(res);
          setIsVerified(true);
          clearInterval(int);
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }

  useEffect(() => {
    if (!proofRequest) {
      createProofRequest();
    }
  });

  function getSubjectID() {
    if (proofRequest.presentation.holder) {
      return proofRequest.presentation.holder;
    }

    const cred = proofRequest.credentials[0];
    if (cred) {
      return cred.credentialSubject.id;
    }

    return 'Unknown';
  }

  return (
    <div>
      <div className="orgCard">
        <div className="m-auto cardImg valign-middle">
          <p className="mb-5 font-bold">{title}</p>
          {isVerified ? (
            <div className="pt-5 text-sm min-h-28">
              Verified!
              <br />
              <br />
              {proofRequest && proofRequest.presentation && (
                <>
                  Subject ID: {getSubjectID().substr(0, 32)}...
                  <br />
                </>
              )}
            </div>
          ) : (
            <div>
              {proofRequest ? (
                <QRCodeGenerator url={proofRequest.qrUrlData.url} />
              ) : (
                <>Loading...</>
              )}
            </div>
          )}
        </div>
        <hr />
        <div className="pt-5 min-h-28">
          <p className="text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [ebsiURLS, setEBSIUrls] = useState();
  const [credentialOffer, setCredentialOffer] = useState();
  const [credentialOfferNoAuth, setCredentialOfferNoAuth] = useState();

  async function createCredentialOffer() {
    const { data: credentialOffer } = await postRequestLocal('create-credential-offer', {
      claimMap,
      credentialOptions: {
        credential: {
          ...credential,
          issuer: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
        },
      },
      singleUse: true,
      authProvider,
    });

    setCredentialOffer(credentialOffer);
  }

  async function createCredentialOfferNoAuth() {
    const { data: credentialOffer } = await postRequestLocal('create-credential-offer', {
      credentialOptions: {
        credential: {
          ...credential,
          issuer: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
        },
      },
      singleUse: true,
    });

    setCredentialOfferNoAuth(credentialOffer);
  }

  async function generateEBSIUrls() {
    const { data: proofRequest } = await postRequestLocal('create-proof-request-object', {
      did: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
      ...ebsiConformanceProofRequest,
    });

    setEBSIUrls({
      verifier: `${dockUrl}/openid/vp/${proofRequest.id}`,
    });
  }

  useEffect(() => {
    if (!credentialOffer && !credentialOfferNoAuth) {
      createCredentialOffer();
      createCredentialOfferNoAuth();
    }
  }, []);

  return (
    <>
      <div className="p-10 m-auto text-center cardsContainer">
        <div className="flex items-center">
          <div className="mr-3 h-[24px]">
            <Image alt="truveralogo" src="/truveralogoblack.png" width={108} height={24} />
          </div>
          <div>
            <h1 className="Header">
              <span className="mr-2">|</span> Sales Demo
            </h1>
          </div>
        </div>
        <div className="grid gap-4 pt-5 text-center xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
          <div>
            <div className="orgCard">
              <div className="m-auto cardImg valign-middle">
                <p className="mb-5 font-bold">OID4VCI</p>
                <div>
                  {credentialOffer ? (
                    <QRCodeGenerator url={credentialOffer.url} />
                  ) : (
                    <>Loading...</>
                  )}
                </div>
              </div>
              <hr />
              <div className="pt-5 min-h-28">
                <p className="text-sm">
                  Scan this QR code to initiate an OID4VCI import flow, it will ask you to enter
                  your name which will be put in the credential.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="orgCard">
              <div className="m-auto cardImg valign-middle">
                <p className="mb-5 font-bold">OID4VCI (no auth)</p>
                <div>
                  {credentialOfferNoAuth ? (
                    <QRCodeGenerator url={credentialOfferNoAuth.url} />
                  ) : (
                    <>Loading...</>
                  )}
                </div>
              </div>
              <hr />
              <div className="pt-5 min-h-28">
                <p className="text-sm">
                  Scan this QR code to initiate an OID4VCI import flow and instantly get a
                  credential.
                </p>
              </div>
            </div>
          </div>

          <OID4VPProofRequest
            proofRequestSetupObject={dockProofRequest}
            title="OID4VP"
            desc="Scan this QR code to initiate an OID4VP proof request flow for the credential imported from the OID4VCI flow."
          />

          <OID4VPProofRequest
            proofRequestSetupObject={sphereonProofRequest}
            title="SIOP V2 (Sphereon)"
            desc="Scan this QR code with your Sphereon Wallet to present a JWT SIOP identity credential to the Dock API."
          />
        </div>
        <div className="mt-10 mb-10">
          <Separator />
        </div>
        <div className="m-auto mt-5">
          <button className="launchBtn" style={{ width: '300px' }} onClick={generateEBSIUrls}>
            Generate EBSI Conformance URLs
          </button>
          <br />
          <br />
          {ebsiURLS && (
            <>
              Verifier (
              <a href="https://hub.ebsi.eu/wallet-conformance/verifier/flow">
                https://hub.ebsi.eu/wallet-conformance/verifier/flow
              </a>
              ) Client ID:
              <br />
              <strong>
                <a href={ebsiURLS.verifier}>{ebsiURLS.verifier}</a>
              </strong>
            </>
          )}
        </div>
      </div>
    </>
  );
}
