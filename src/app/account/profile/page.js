import SelectCountry from "@/app/_component/SelectCountry";
import UpdateProfileForm from "@/app/_component/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = { title: "Update Profile" };

// export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth();

  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          key={guest.nationality} //most importaint key na pass karne se select me jo country ek step piche jo select kiya tha vo UI me show kar rha tha current country select nhi UI pr aa rha tha database me to save current city ho ja rhi thi
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
