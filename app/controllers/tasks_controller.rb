class TasksController < ApplicationController
  respond_to :html,:json

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @createdUser = Task.create(content: params[:content], created_at: params[:created_at])
    render json: @createdUser
  end
end
