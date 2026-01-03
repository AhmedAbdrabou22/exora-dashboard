import { BaseInput } from "../../molecules/BaseInput";

function MainData() {
  return (
    <div>
      <BaseInput
        name="name"
        type="text"
        label="اسم المستخدم"
        placeholder="ادخل اسم المستخدم"
      />

      <BaseInput
        name="email"
        type="email"
        label="البريد الإلكتروني"
        placeholder="ادخل البريد الإلكتروني"
      />

      <BaseInput
        name="phone_number"
        type="text"
        label="رقم الهاتف"
        placeholder="ادخل رقم الهاتف"
      />

      <BaseInput
        name="f_name"
        type="text"
        label="الاسم الأول"
        placeholder="ادخل الاسم الأول"
      />

      <BaseInput
        name="l_name"
        type="text"
        label="اسم العائلة"
        placeholder="ادخل اسم العائلة"
      />

      <BaseInput
        name="password"
        type="password"
        label="كلمة المرور"
        placeholder="ادخل كلمة المرور"
      />

      <BaseInput
        name="password_confirmation"
        type="password"
        label="تأكيد كلمة المرور"
        placeholder="أعد إدخال كلمة المرور"
      />
    </div>
  );
}

export default MainData;
