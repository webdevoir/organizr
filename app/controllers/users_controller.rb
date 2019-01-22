class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => :create

  def create
    user = User.new(email: params[:email], password: params[:password])
    if user.save
      render json: user
    else
      return head(:bad_request)
    end
  end

end
