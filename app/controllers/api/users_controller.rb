class Api::UsersController < ApplicationController
  # this tells rails to look out for password and automatically wrap
  wrap_parameters include: User.attribute_names + ['password']
  
  # added in class demo
  # before_action :require_logged_out, only: [:create]
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render json: @user
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity # status 422 too
    end

  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
