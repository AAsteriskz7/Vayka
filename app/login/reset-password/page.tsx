const { error } = await supabase.auth.updateUser({
  password: newPassword,
})

if (error) throw error