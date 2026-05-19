

const DoctorsDetailsPage = async({params}) => {
    const {id}=await params
  const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`)
  const doctor= await res.json()
  console.log(doctor);
    return (
        <div>
           Doctor details page 
        </div>
    );
};

export default DoctorsDetailsPage;