export default async function deleteUser(id) {
  const dev = process.env.NODE_ENV !== "production";
  const server = dev
    ? "http://localhost:3000"
    : "https://devshowcase-22.vercel.app";

  try {
    const response = await fetch(`${server}/api/profile`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        profile_id: id,
      },
    });

    const data = await response.json();

    if (data.status == "fail") throw new Error(data.message);
    return data.message;
  } catch (error) {
    return error;
  }
}
