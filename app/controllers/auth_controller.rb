class AuthController < ApplicationController

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      payload = { user_id: user.id }
      token = JWT.encode(payload, "SECRET") # refactor this secret!
      render json: { user: user, jwt: token }
    else
      render head(:unauthorized)
    end
  end
  
end
