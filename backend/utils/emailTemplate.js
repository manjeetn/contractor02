export const otpEmailTemplate = (name, otp, purpose = "Verify Your Email") => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fafafa;">
      <h2 style="text-align: center; color: rgba(255, 102, 0, 1); margin-bottom: 20px;">
         ${purpose} 
      </h2>
      <p style="font-size: 14px; color: #333;">Hi <b>${name || "User"}</b>,</p>
      <p style="font-size: 13px; color: #333;">
        Please use the following One-Time Password (OTP):
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; color: #ff6600; letter-spacing: 5px; padding: 10px 20px; border: 2px dashed #ff6600; border-radius: 8px; background: #fff;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 12px; color: #555;">
         This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.
      </p>
    </div>
  `;
};
