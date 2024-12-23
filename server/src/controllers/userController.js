import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /users
 * {gender, date_of_birth}
 *
 */
export async function createUser(req, res) {
  const { gender, date_of_birth, weight, height, activity_level } = req.body;
  const uid = req.user.uid;

  try {
    const user = await db("firebase_user").where({ uid: uid });
    if (user.length !== 0) {
      return res.status(400).json({ msg: "User exists", user });
    } else {
      const newUser = await db("firebase_user").insert({
        uid,
        gender: gender || null,
        date_of_birth: date_of_birth || null,
      });

      //Custom Claims verwenden, um einem Benutzer ein signUpCompleted zuzuweisen,
      //sobald sein Profil erfolgreich erstellt wurde.
      await admin.auth().setCustomUserClaims(uid, { signUpCompleted: true });

      res.status(200).json({
        message: "User profile created successfully",
        newUser,
      });
    }
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @api GET /users/profile
 *
 *
 */
export async function userProfile(req, res) {
  const uid = req.user.uid;

  try {
    const user = await db("firebase_user").select("id").where({ uid }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_id = user.id;
    const userData = await db("firebase_user")
      .select("user.id", "user.date_of_birth", "user.gender")
      .where("user.id", user_id);

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
