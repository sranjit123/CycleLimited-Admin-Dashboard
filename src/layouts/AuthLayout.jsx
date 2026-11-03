function AuthLayout({
  formTitle,
  children,
  sideTitle,
  sideDescription,
  sideButtonText,
  onSideButtonClick,
  sideImage,
}) {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-slate-100 ">
      {/* <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"> */}
      <div className="mx-auto flex h-[75vh] w-3/4 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="flex w-1/2 items-center justify-center px-12 py-16">
          <div className="w-full max-w-md">
            <h1 className="py-3  text-2xl font-bold text-slate-900 ">
              {formTitle}
            </h1>
            {children}
          </div>
        </div>
        {/* <div className="flex w-1/2 items-center justify-center bg-cover bg-center px-12 py-16 text-white" style={{backgroundImage:`url(${sideImage})`}}>
          <div className="max-w-md text-center">
            <h2 className="text-xl font-bold">{sideTitle}</h2>
            <p className="py-2 text-sm leading-6 text-slate-300">{sideDescription}</p>
            <button type="button" onClick={onSideButtonClick} className="py-2 px-3 my-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100">
              {sideButtonText}
            </button>
          </div>
        </div> */}
        <div
          className="flex flex-col items-center w-1/2 justify-center space-y-10  text-center bg-cover bg-center bg-black/40 bg-blend-multiply px-12 py-16 text-white"
          style={{ backgroundImage: `url(${sideImage})` }}
        >
          <div className="max-w-md text-center mt-12 ">
            <h2 className="text-2xl font-bold">{sideTitle}</h2>
            <p className="py-2 text-lg leading-6 text-slate-50">
              {sideDescription}
            </p>
          </div>

          {/* <button
              type="button"
              onClick={onSideButtonClick}
              className=" my-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-300"
            >
              {sideButtonText}
            </button> */}

          <div className="text-base"> Cycle Limited Admin</div>
        </div>
      </div>
    </div>
  );
}
export default AuthLayout;
